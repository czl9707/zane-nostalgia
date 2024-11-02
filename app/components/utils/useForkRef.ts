import * as React from 'react';

function setRef<T>(
    ref: React.MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined,
    value: T | null,
): void {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref) {
        ref.current = value;
    }
}

export default function useForkRef<Instance>(
    ...refs: Array<React.Ref<Instance> | undefined>
): React.RefCallback<Instance> | null {
    return React.useMemo(() => {
        if (refs.every((ref) => ref == null)) {
            return null;
        }

        return (instance) => {
            refs.forEach((ref) => {
                setRef(ref, instance);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, refs);
}