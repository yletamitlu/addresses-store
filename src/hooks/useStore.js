import {useContext} from 'react';
import {StoreContext} from '../index.js';

export default function useStore() {
    return useContext(StoreContext);
}
