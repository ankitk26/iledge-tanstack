import { create } from "zustand";

export type PaginationState = {
  windowStart: number;
  windowSize: number;
  navigationStep: number;
  totalItems: number;
};

type PaginationStoreState = {
  instances: Record<string, PaginationState>;
  getInstanceState: (instanceId: string) => PaginationState;
  updateInstanceState: (
    instanceId: string,
    updates: Partial<PaginationState>
  ) => void;
};

// Updated default pagination state
const DEFAULT_PAGINATION_STATE: PaginationState = {
  windowStart: 0,
  windowSize: 15, // Show 15 items at a time
  navigationStep: 15, // Move 15 positions each time
  totalItems: 0,
};

export const usePaginationStore = create<PaginationStoreState>((set, get) => ({
  // Store multiple pagination instances by ID
  instances: {
    default: DEFAULT_PAGINATION_STATE,
  },

  // Get an instance state (creates one if it doesn't exist)
  getInstanceState: (instanceId: string) => {
    const state = get().instances[instanceId];
    if (!state) {
      // Create a new instance if it doesn't exist
      set((store) => ({
        instances: {
          ...store.instances,
          [instanceId]: DEFAULT_PAGINATION_STATE,
        },
      }));
      return DEFAULT_PAGINATION_STATE;
    }
    return state;
  },

  // Update an instance state
  updateInstanceState: (
    instanceId: string,
    updates: Partial<PaginationState>
  ) => {
    set((store) => ({
      instances: {
        ...store.instances,
        [instanceId]: {
          ...store.getInstanceState(instanceId),
          ...updates,
        },
      },
    }));
  },
}));

export const navigatePrevious = (instanceId = "default") => {
  const { getInstanceState, updateInstanceState } =
    usePaginationStore.getState();
  const state = getInstanceState(instanceId);
  const { windowStart, navigationStep } = state;

  if (windowStart > 0) {
    updateInstanceState(instanceId, {
      windowStart: Math.max(windowStart - navigationStep, 0),
    });
  }
};

export const navigateNext = (instanceId = "default") => {
  const { getInstanceState, updateInstanceState } =
    usePaginationStore.getState();
  const state = getInstanceState(instanceId);
  const { windowStart, windowSize, totalItems, navigationStep } = state;

  if (windowStart < totalItems - windowSize) {
    updateInstanceState(instanceId, {
      windowStart: Math.min(
        windowStart + navigationStep,
        totalItems - windowSize
      ),
    });
  }
};

export const navigateMostRecent = (instanceId = "default") => {
  const { getInstanceState, updateInstanceState } =
    usePaginationStore.getState();
  const state = getInstanceState(instanceId);
  const { totalItems, windowSize } = state;

  // For most recent items, we want to start from the end
  updateInstanceState(instanceId, {
    windowStart: Math.max(0, totalItems - windowSize),
  });
};

export const navigateMostOld = (instanceId = "default") => {
  const { updateInstanceState } = usePaginationStore.getState();
  updateInstanceState(instanceId, { windowStart: 0 });
};

export const setWindowStart = (value: number, instanceId = "default") => {
  const { updateInstanceState } = usePaginationStore.getState();
  updateInstanceState(instanceId, { windowStart: value });
};

export const setTotalItems = (count: number, instanceId = "default") => {
  const { getInstanceState, updateInstanceState } =
    usePaginationStore.getState();
  const state = getInstanceState(instanceId);

  // When setting total items, automatically adjust to show most recent items
  updateInstanceState(instanceId, {
    totalItems: count,
    windowStart: Math.max(0, count - state.windowSize),
  });
};

// Helper function to get a specific instance state for components
export const usePaginationStoreInstance = (
  instanceId = "default",
  options?: Partial<PaginationState>
) => {
  // Get the store state
  const state = usePaginationStore((store) => {
    const instanceState = store.getInstanceState(instanceId);

    // If options are provided and this looks like a default state (i.e., new instance),
    // apply the options but only do this once
    if (
      options &&
      instanceState.windowStart === DEFAULT_PAGINATION_STATE.windowStart &&
      instanceState.windowSize === DEFAULT_PAGINATION_STATE.windowSize &&
      instanceState.navigationStep ===
        DEFAULT_PAGINATION_STATE.navigationStep &&
      instanceState.totalItems === DEFAULT_PAGINATION_STATE.totalItems
    ) {
      // Update the instance with custom options
      store.updateInstanceState(instanceId, options);
    }

    return store.getInstanceState(instanceId);
  });

  return state;
};

// Helper function to get pagination controls for a specific instance
export const usePaginationStoreControls = (
  instanceId = "default",
  config?: Partial<PaginationState>
) => {
  const state = usePaginationStoreInstance(instanceId, config);
  const { windowStart, windowSize, totalItems } = state;

  // Derived values
  const canGoToNewer = windowStart > 0;
  const canGoToOlder = windowStart < totalItems - windowSize;
  const showPagination = totalItems > windowSize;
  const isAtMostRecent = windowStart === Math.max(0, totalItems - windowSize);
  const isAtMostOld = windowStart === 0;

  // Calculate the range of items being displayed
  const startItem = windowStart + 1;
  const endItem = Math.min(windowStart + windowSize, totalItems);

  // Helper function to get windowed data
  const getWindowedData = <T>(data: T[]): T[] => {
    if (data.length !== totalItems) {
      // Auto-update totalItems if data length has changed
      setTotalItems(data.length, instanceId);
      return data.slice(Math.max(0, data.length - windowSize), data.length); // Show most recent items
    }

    return data.slice(
      windowStart,
      Math.min(windowStart + windowSize, data.length)
    );
  };

  return {
    // State
    windowStart,
    windowSize,
    totalItems,

    // Controls
    navigatePrevious: () => navigatePrevious(instanceId),
    navigateNext: () => navigateNext(instanceId),
    navigateMostRecent: () => navigateMostRecent(instanceId),
    navigateMostOld: () => navigateMostOld(instanceId),
    setWindowStart: (value: number) => setWindowStart(value, instanceId),
    setTotalItems: (count: number) => setTotalItems(count, instanceId),

    // Derived values
    canGoToNewer,
    canGoToOlder,
    isAtMostRecent,
    isAtMostOld,
    showPagination,
    startItem,
    endItem,

    // Data helper
    getWindowedData,
  };
};
