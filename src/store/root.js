import {types} from 'mobx-state-tree';
import AddressStore from "./addresess";

const RootStore = types.model('Root', {
    addresses: types.optional(AddressStore, {}),
});

export default RootStore;
