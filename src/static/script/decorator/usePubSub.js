import pubsub from '../util/pubsub.js'

export function usePubSub(targetClass) {
    pubsub.pubsub(targetClass.prototype);
}
