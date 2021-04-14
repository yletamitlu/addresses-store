import {flow, types, onSnapshot} from 'mobx-state-tree';
import { v4 as uuidv4 } from 'uuid';
import apiCall from '../api/api';

const Address = types.model('Address', {
    id: types.identifier,
    dest: types.string,
    price: types.string,
    date: types.string,
    creator: types.string,
    status: types.string,
});

const AddressStore = types.model('BoardStore', {
    active: types.safeReference(Address),
    addresses: types.array(Address),
    changed: types.safeReference(Address),
}).actions(self => {
    return {
        load: flow(function* () {
            self.addresses = yield apiCall.get('addresses');

            onSnapshot(self, self.save);
        }),
        afterCreate() {
            self.load();
        },
        addAddress(newAddress) {
            self.addresses.push({id: uuidv4(), ...newAddress});
        },
        changeAddress(changedAddress) {
            self.addresses.forEach(addr => {
                if (addr.id === changedAddress.id) {
                    addr.dest = changedAddress.dest;
                    addr.price = changedAddress.price;
                    addr.date = changedAddress.date;
                    addr.creator = changedAddress.creator;
                    addr.status = changedAddress.status;
                    self.changed = addr;
                }
            });
            onSnapshot(self, self.change);
        },
        selectAddress(id) {
            self.active = id;
        },
        change: flow(function* ({changed}) {
            yield apiCall.put(`addresses/${self.changed.id}`, {...self.changed});
        }),
        save: flow(function* ({addresses}) {
            const newAddr = addresses[addresses.length - 1];
            yield apiCall.post(`addresses`, {...newAddr});
        }),
    }
}).views(self => {
    return {
        get activeAddr() {
            return self.addresses.addresses[self.active];
        },

        findAddrByDest(dest) {
            const lower = dest.toLowerCase();
            return self.addresses.filter(addr => addr.dest.toLowerCase().includes(lower)
                || addr.status.toLowerCase().includes(lower))
        },

        getExample() {
            return self.addresses;
        }
    }
})

export default AddressStore;
