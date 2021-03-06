import * as provider from '../../provider';

export function findOrList(name) {
    const store = provider.getStore();

    if (name) {
        return store
            .find(name)
            .then(podcast => [podcast]);
    } else {
        return store.list();
    }
}
