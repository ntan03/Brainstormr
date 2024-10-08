import { useSelf, useMutation } from "@liveblocks/react";

export const useDeleteLayers = () => {
  const selection = useSelf((me) => me.presence.selection);

  return useMutation(
    ({ storage, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const liveLayerIds = storage.get("layerIds");

      if (selection) {
        for (const layerId of selection) {
          liveLayers.delete(layerId);

          const index = liveLayerIds.indexOf(layerId);
          if (index !== -1) liveLayerIds.delete(index);
        }

        setMyPresence({ selection: [] }, { addToHistory: true });
      }
    },
    [selection]
  );
};
