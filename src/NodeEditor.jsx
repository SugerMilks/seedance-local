import React from "react";
import {
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  FileAudio,
  FileImage,
  Film,
  FolderOpen,
  MonitorPlay,
  ImagePlus,
  Lock,
  PanelLeftClose,
  PanelLeftOpen,
  Palette,
  Play,
  Plus,
  Save,
  Trash2,
  Type,
  Unlock,
  Video,
  X
} from "lucide-react";
import "./nodeEditor.css";

const nodeCatalog = [
  { type: "text", label: "Text", icon: Type },
  { type: "image", label: "Image", icon: FileImage },
  { type: "camera", label: "Camera", icon: Camera },
  { type: "style", label: "Style", icon: Palette },
  { type: "transfer", label: "Transfer", icon: Compass },
  { type: "video", label: "Video", icon: Video },
  { type: "audio", label: "Audio", icon: FileAudio },
  { type: "preview", label: "Preview", icon: MonitorPlay },
  { type: "imageModel", label: "Image Model", icon: ImagePlus },
  { type: "videoModel", label: "Video Model", icon: Film }
];

const portColors = {
  prompt: "#f0c83b",
  image: "#3d85ff",
  camera: "#ef4444",
  style: "#9b5cff",
  transfer: "#ff4fb3",
  video: "#58ce63",
  audio: "#ff8b35",
  preview: "#8d8d8d"
};

const maxTransferImages = 6;
const batchOptions = ["1", "2", "3", "4"];
const transferPromptSuffix =
  "Only use the uploaded collage reference image labeled TRANSFER.png as a transfer reference for color grading, grain style, texture, lighting, and camera qualities. The generated image should NOT take content, layout, subjects, or composition from TRANSFER.png directly; only use it as a visual transfer guide.";
const stylePresetPrompts = {
  None: "",
  Cinematic:
    "High-end cinematic still frame, shot on ARRI Alexa 35, high quality prime lens, high dynamic range, shallow depth of field, atmospheric cinematography, high production value, feature film look.",
  Storyboard:
    "Hand-drawn digital storyboard, line drawing with minimalistic shading, grayscale shading, cinematic composition, production-planning style, loose but intentional drawing, simple tonal blocking, clear visual storytelling. A black and white line drawing. No color. No pencil or charcoal sketches. No text or numbers unless described. No frame boarders.",
  Commercial:
    "Polished commercial image, premium advertising style, clean composition, bright refined lighting, shallow depth of field, elevated brand look, modern campaign aesthetic, crisp details, visually appealing.",
  Anime:
    "Stylized anime illustration, clean linework, expressive design, cinematic art lighting, vibrant controlled color palette, detailed background art, dynamic framing, polished animated look, emotionally engaging atmosphere.",
  Claymation:
    "Handmade claymation style, stop-motion look, sculpted clay characters, environment, and props, tactile surfaces, visible handmade imperfections, miniature set design, soft lighting, charming handcrafted aesthetic.",
  "2D Animation":
    "Clean 2D animation style, bold graphic shapes, smooth color blocking, expressive poses, simplified forms, clear silhouettes, modern animated design, playful and readable composition.",
  "3D Animation":
    "Stylized 3D animation look, polished modeling, soft global illumination, appealing textures, expressive forms, cinematic framing, animated feature quality, clean rendering, vibrant and dimensional.",
  "Dark as Fuk":
    "Haunting atmospheric style, eerie stillness, very disturbing and unsettling mood, quiet tension, ghostly lighting, muted colors, shadows, liminal spaces, subtle surreal details, lonely composition, restrained horror tone, dreamlike unease, beautiful but disturbing visual atmosphere.",
  "Pop as Fuk":
    "Poppy fun style, bright bold colors, playful composition, energetic, upbeat mood, glossy visual polish, cheerful, vibrant contrast, whimsical details, modern campaign-ready look, colorful and instantly engaging, super poppy music video vibes.",
  "Sexy as Fuk":
    "High-fashion edgy style, natural, anatomy allure, elegant sensuality, bare skin, bare anatomy, minimal, sculptural, flattering dramatic lighting, skin highlights, premium fashion photography, magnetic presence, sophisticated mood, form and shape, soft skin texture, risky high fashion, edgy.",
  "Strange as Fuk":
    "Strange surreal style, offbeat visual logic, unexpected shapes, odd proportions, unusual textures, dreamlike atmosphere, slightly unsettling but playful tone, surreal composition, imaginative art direction, weird in a smart and intentional way, strange morphs, unexpected abstract realism."
};
const stylePresetNames = Object.keys(stylePresetPrompts);
const shotPresetPrompts = {
  None: "",
  CU: "A close up shot.",
  MS: "A medium shot.",
  WS: "A wide shot.",
  ECU: "An extreme close up shot.",
  EWS: "An extreme wide shot."
};
const lensPresetPrompts = {
  None: "",
  "18mm": "Shot on a wide 18mm prime lens.",
  "35mm": "Shot on a wide 35mm prime lens.",
  "50mm": "Shot on a 50mm prime lens.",
  "85mm": "Shot on a long 85mm prime lens.",
  "120mm": "Shot on a long 120mm prime lens.",
  Macro: "Shot on a macro probe lens."
};
const typePresetPrompts = {
  None: "",
  "Low Angle": "A low angle shot.",
  "High Angle": "A high angle shot.",
  "Extreme High": "A bird's eye view from extremely high angled shot.",
  "Extreme Low": "A worm's eye view from extremely low angled shot.",
  Portrait: "A portrait shot.",
  Profile: "A profile shot."
};
const shotPresetNames = Object.keys(shotPresetPrompts);
const lensPresetNames = Object.keys(lensPresetPrompts);
const typePresetNames = Object.keys(typePresetPrompts);

const initialNodes = [
  {
    id: "text-1",
    type: "text",
    x: 110,
    y: 108,
    data: {
      title: "Prompt",
      text: "A serene landscape with mountains"
    }
  },
  {
    id: "image-1",
    type: "image",
    x: 110,
    y: 442,
    data: {
      title: "Image"
    }
  },
  {
    id: "image-model-1",
    type: "imageModel",
    x: 620,
    y: 126,
    data: {
      title: "Image Model",
      model: "Nano Banana Pro",
      prompt: "A serene landscape with mountains",
      aspectRatio: "21:9",
      resolution: "2K"
    }
  },
  {
    id: "video-model-1",
    type: "videoModel",
    x: 1138,
    y: 44,
    data: {
      title: "Video Model",
      model: "Seedance 2.0",
      prompt: "A beautiful sunset over a calm ocean",
      duration: "15 seconds",
      resolution: "720p",
      aspectRatio: "16:9 (Landscape)",
      generateAudio: true
    }
  }
];

const initialEdges = [
  { id: "edge-1", from: { nodeId: "text-1", port: "promptOut" }, to: { nodeId: "image-model-1", port: "promptIn" }, color: portColors.prompt },
  { id: "edge-2", from: { nodeId: "image-1", port: "imageOut" }, to: { nodeId: "image-model-1", port: "imagePromptIn" }, color: portColors.image }
];

const contextMenuSize = { width: 190, height: 382, inset: 8 };
const minZoom = 0.35;
const maxZoom = 1.9;
const nodeDraftStorageKey = "seedance-node-editor-draft-v1";
const previewBaseWidth = 330;
const groupPalette = ["#3d85ff", "#f0c83b", "#58ce63", "#9b5cff", "#ff4fb3", "#ff8b35"];
const groupPadding = { x: 42, top: 62, bottom: 42 };
const groupMinWidth = 260;
const groupMinHeight = 190;
const imageRunStaggerMs = 850;
const videoModelNames = {
  seedance: "Seedance 2.0",
  seedanceFast: "Seedance 2.0 Fast",
  wanFunControl: "Wan Fun Control",
  aurora: "Creatify Aurora",
  sam3Video: "SAM 3 Video"
};
const sam3SegmentationModelsEnabled = false; // Flip back to true when revisiting SAM 3 segmentation.

export default function NodeEditor() {
  const canvasRef = React.useRef(null);
  const projectMenuRef = React.useRef(null);
  const workflowFileInputRef = React.useRef(null);
  const undoStackRef = React.useRef([]);
  const clipboardRef = React.useRef(null);
  const savedDraft = React.useMemo(loadNodeEditorDraft, []);
  const nodesRef = React.useRef(savedDraft.nodes);
  const edgesRef = React.useRef(savedDraft.edges);
  const [nodes, setNodes] = React.useState(savedDraft.nodes);
  const [edges, setEdges] = React.useState(savedDraft.edges);
  const [groups, setGroups] = React.useState(savedDraft.groups);
  const [dragState, setDragState] = React.useState(null);
  const [draftEdge, setDraftEdge] = React.useState(null);
  const [portPositions, setPortPositions] = React.useState({});
  const [selectionBounds, setSelectionBounds] = React.useState(null);
  const [viewport, setViewport] = React.useState(savedDraft.viewport);
  const [selectedNodeIds, setSelectedNodeIds] = React.useState([]);
  const [projectName, setProjectName] = React.useState(savedDraft.projectName);
  const [projectId, setProjectId] = React.useState(savedDraft.projectId);
  const [savedProjectName, setSavedProjectName] = React.useState(savedDraft.savedProjectName);
  const [projects, setProjects] = React.useState([]);
  const [projectMenuOpen, setProjectMenuOpen] = React.useState(false);
  const [contextMenu, setContextMenu] = React.useState(null);
  const [toolbarCollapsed, setToolbarCollapsed] = React.useState(true);
  const [saveStatus, setSaveStatus] = React.useState("");
  const [compilingTransferNodeId, setCompilingTransferNodeId] = React.useState(null);
  const [selectedEdgeId, setSelectedEdgeId] = React.useState(null);

  const incomingByNode = React.useMemo(() => buildIncomingByNode(nodes, edges), [nodes, edges]);
  const connectedPortKeys = React.useMemo(() => buildConnectedPortKeys(edges), [edges]);
  const selectedNodeSet = React.useMemo(() => new Set(selectedNodeIds), [selectedNodeIds]);
  const activeEdgeIds = React.useMemo(() => buildActiveEdgeIds(nodes, edges), [nodes, edges]);
  const inactiveEdgeIds = React.useMemo(() => buildInactiveEdgeIds(nodes, edges), [nodes, edges]);
  const selectedRunnableNodes = React.useMemo(
    () => nodes.filter((node) => selectedNodeSet.has(node.id) && isRunnableNode(node) && node.data.status !== "running"),
    [nodes, selectedNodeSet]
  );
  const selectedProjectName = projects.find((project) => project.id === projectId)?.name;

  React.useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  React.useEffect(() => {
    edgesRef.current = edges;
  }, [edges]);

  React.useLayoutEffect(() => {
    updatePortPositions();
    updateSelectionBounds();
  }, [nodes, viewport, selectedNodeIds]);

  React.useLayoutEffect(() => {
    syncGroupMembership();
  }, [nodes, groups, viewport]);

  React.useEffect(() => {
    loadProjects();
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(
        nodeDraftStorageKey,
        JSON.stringify({
          nodes,
          edges,
          groups,
          viewport,
          projectId,
          projectName,
          savedProjectName
        })
      );
    } catch {
      // Local persistence should never interrupt the node editor.
    }
  }, [nodes, edges, groups, viewport, projectId, projectName, savedProjectName]);

  React.useEffect(() => {
    const handleResize = () => updatePortPositions();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [viewport]);

  React.useEffect(() => {
    if (selectedEdgeId && !edges.some((edge) => edge.id === selectedEdgeId)) {
      setSelectedEdgeId(null);
    }
  }, [edges, selectedEdgeId]);

  React.useEffect(() => {
    function handleKeyDown(event) {
      const commandKey = event.metaKey || event.ctrlKey;
      const key = event.key.toLowerCase();

      if (commandKey && key === "s") {
        event.preventDefault();
        saveProject();
        return;
      }

      if (event.target.closest?.("input, textarea, select")) return;

      if (commandKey && key === "z") {
        event.preventDefault();
        undoGraphChange();
        return;
      }

      if (commandKey && key === "c") {
        event.preventDefault();
        copySelection();
        return;
      }

      if (commandKey && key === "v") {
        event.preventDefault();
        pasteSelection();
        return;
      }

      if (event.key === "Backspace" || event.key === "Delete") {
        if (selectedEdgeId) {
          event.preventDefault();
          removeEdges([selectedEdgeId]);
          return;
        }

        if (!selectedNodeIds.length) return;
        event.preventDefault();
        removeNodes(selectedNodeIds);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNodeIds, selectedEdgeId, nodes, edges, groups, viewport, projectId, projectName, savedProjectName, selectedProjectName]);

  React.useEffect(() => {
    function handlePointerDown(event) {
      if (!projectMenuRef.current?.contains(event.target)) {
        setProjectMenuOpen(false);
      }
      if (!event.target.closest?.(".node-context-menu")) {
        setContextMenu(null);
      }
    }

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function handleWheel(event) {
      handleCanvasWheel(event);
    }

    canvas.addEventListener("wheel", handleWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", handleWheel);
  }, []);

  React.useEffect(() => {
    function blockPagePinchOutsideCanvas(event) {
      if (!event.ctrlKey && !event.metaKey) return;

      const canvas = canvasRef.current;
      if (canvas?.contains(event.target)) return;

      event.preventDefault();
      event.stopPropagation();
    }

    function blockBrowserGestureOutsideCanvas(event) {
      const canvas = canvasRef.current;
      if (canvas?.contains(event.target)) return;

      event.preventDefault();
      event.stopPropagation();
    }

    window.addEventListener("wheel", blockPagePinchOutsideCanvas, { passive: false, capture: true });
    window.addEventListener("gesturestart", blockBrowserGestureOutsideCanvas, { passive: false, capture: true });
    window.addEventListener("gesturechange", blockBrowserGestureOutsideCanvas, { passive: false, capture: true });
    return () => {
      window.removeEventListener("wheel", blockPagePinchOutsideCanvas, { capture: true });
      window.removeEventListener("gesturestart", blockBrowserGestureOutsideCanvas, { capture: true });
      window.removeEventListener("gesturechange", blockBrowserGestureOutsideCanvas, { capture: true });
    };
  }, []);

  function updatePortPositions() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();
    const nextPositions = {};
    canvas.querySelectorAll("[data-port-key]").forEach((element) => {
      const rect = element.getBoundingClientRect();
      nextPositions[element.dataset.portKey] = {
        x: (rect.left - canvasRect.left + rect.width / 2 - viewport.x) / viewport.scale,
        y: (rect.top - canvasRect.top + rect.height / 2 - viewport.y) / viewport.scale
      };
    });
    setPortPositions(nextPositions);
  }

  function updateSelectionBounds() {
    if (selectedNodeIds.length < 2) {
      setSelectionBounds(null);
      return;
    }

    setSelectionBounds(getNodeSetBounds(selectedNodeIds));
  }

  function getNodeSetBounds(nodeIds) {
    const bounds = nodeIds.map(getNodeBounds).filter((rect) => rect.right > rect.left && rect.bottom > rect.top);
    if (!bounds.length) return null;

    const left = Math.min(...bounds.map((rect) => rect.left));
    const top = Math.min(...bounds.map((rect) => rect.top));
    const right = Math.max(...bounds.map((rect) => rect.right));
    const bottom = Math.max(...bounds.map((rect) => rect.bottom));

    return {
      left,
      top,
      right,
      bottom,
      width: right - left,
      height: bottom - top
    };
  }

  function syncGroupMembership() {
    if (!groups.length || !canvasRef.current) return;

    setGroups((current) => {
      let changed = false;
      const nextGroups = current.map((group) => {
        const nodeIds = getNodeIdsInsideGroup(group);
        const nextNodeIds = nodeIds;

        if (sameStringList(group.nodeIds || [], nextNodeIds)) return group;
        changed = true;
        return { ...group, nodeIds: nextNodeIds };
      });

      return changed ? nextGroups : current;
    });
  }

  function addNode(type, position) {
    const count = nodes.filter((node) => node.type === type).length + 1;
    const spec = nodeCatalog.find((item) => item.type === type);
    pushUndoSnapshot();
    setSelectedEdgeId(null);
    setNodes((current) => [
      ...current,
      {
        id: `${type}-${Date.now()}`,
        type,
        x: position?.x ?? 180 + count * 28,
        y: position?.y ?? 160 + count * 24,
        data: createDefaultNodeData(type, spec?.label || "Node", count)
      }
    ]);
    setContextMenu(null);
  }

  function removeNode(nodeId) {
    removeNodes([nodeId]);
  }

  function removeNodes(nodeIds) {
    if (!nodeIds.length) return;
    pushUndoSnapshot();
    const ids = new Set(nodeIds);
    setNodes((current) => current.filter((node) => !ids.has(node.id)));
    setEdges((current) => current.filter((edge) => !ids.has(edge.from.nodeId) && !ids.has(edge.to.nodeId)));
    setGroups((current) =>
      current.map((group) => ({ ...group, nodeIds: (group.nodeIds || []).filter((id) => !ids.has(id)) })).filter((group) => group.nodeIds.length)
    );
    setSelectedNodeIds((current) => current.filter((id) => !ids.has(id)));
    setSelectedEdgeId((current) => {
      const edge = edges.find((item) => item.id === current);
      return edge && (ids.has(edge.from.nodeId) || ids.has(edge.to.nodeId)) ? null : current;
    });
  }

  function removeEdges(edgeIds) {
    if (!edgeIds.length) return;
    pushUndoSnapshot();
    const ids = new Set(edgeIds);
    setEdges((current) => current.filter((edge) => !ids.has(edge.id)));
    setSelectedEdgeId(null);
    setSaveStatus(`${edgeIds.length} connection${edgeIds.length === 1 ? "" : "s"} deleted`);
  }

  function createGroupFromSelection() {
    if (selectedNodeIds.length < 2) return;

    const bounds = getNodeSetBounds(selectedNodeIds);
    if (!bounds) {
      setSaveStatus("Could not find selected node bounds");
      return;
    }

    pushUndoSnapshot();
    const color = groupPalette[groups.length % groupPalette.length];
    const group = {
      id: `group-${Date.now()}`,
      name: `Group ${groups.length + 1}`,
      color,
      x: Math.round(bounds.left - groupPadding.x),
      y: Math.round(bounds.top - groupPadding.top),
      width: Math.round(Math.max(groupMinWidth, bounds.width + groupPadding.x * 2)),
      height: Math.round(Math.max(groupMinHeight, bounds.height + groupPadding.top + groupPadding.bottom)),
      nodeIds: [...selectedNodeIds]
    };

    setGroups((current) => [...current, group]);
    setSelectedEdgeId(null);
    setSaveStatus(`Grouped ${selectedNodeIds.length} nodes`);
  }

  function updateGroup(groupId, patch) {
    setGroups((current) => current.map((group) => (group.id === groupId ? { ...group, ...patch } : group)));
  }

  function removeGroup(groupId) {
    pushUndoSnapshot();
    setGroups((current) => current.filter((group) => group.id !== groupId));
    setSaveStatus("Group removed");
  }

  function startGroupDrag(event, group) {
    if (event.target.closest("input, textarea, select, button, .group-resize-handle")) return;
    event.preventDefault();
    event.stopPropagation();
    pushUndoSnapshot();

    const groupNodeIds = getNodeIdsInsideGroup(group);
    const movableNodeIds = groupNodeIds;
    const nodeSet = new Set(movableNodeIds);
    const pointer = screenToScene(event.clientX, event.clientY);

    event.currentTarget.setPointerCapture(event.pointerId);
    setSelectedNodeIds(movableNodeIds);
    setSelectedEdgeId(null);
    updateGroup(group.id, { nodeIds: movableNodeIds });
    setDragState({
      type: "group",
      groupId: group.id,
      startPointer: pointer,
      group: {
        x: group.x,
        y: group.y
      },
      nodes: nodes
        .filter((node) => nodeSet.has(node.id))
        .map((node) => ({
          id: node.id,
          x: node.x,
          y: node.y
        }))
    });
  }

  function startGroupResize(event, group) {
    event.preventDefault();
    event.stopPropagation();
    pushUndoSnapshot();
    const pointer = screenToScene(event.clientX, event.clientY);

    event.currentTarget.setPointerCapture(event.pointerId);
    setSelectedEdgeId(null);
    setDragState({
      type: "groupResize",
      groupId: group.id,
      startPointer: pointer,
      group: {
        width: group.width,
        height: group.height
      }
    });
  }

  function updateNode(nodeId, patch) {
    setNodes((current) => {
      const nextNodes = current.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                ...patch
              }
            }
          : node
      );
      nodesRef.current = nextNodes;
      return nextNodes;
    });
  }

  async function uploadMediaAsset(node, file) {
    if (!file) return;

    pushUndoSnapshot();
    updateNode(node.id, {
      fileName: file.name,
      status: "uploading",
      error: "",
      resultUrl: ""
    });

    const form = new FormData();
    form.append("asset", file);
    form.append("nodeType", node.type);

    try {
      const response = await fetch("/api/node/upload-asset", {
        method: "POST",
        body: form
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed.");

      updateNode(node.id, {
        fileName: data.asset.fileName,
        storedFileName: data.asset.storedFileName,
        mimeType: data.asset.mimeType,
        mediaType: data.asset.mediaType,
        resultUrl: data.asset.localUrl,
        status: "ready",
        error: ""
      });
    } catch (error) {
      updateNode(node.id, {
        status: "error",
        error: error.message
      });
    }
  }

  async function uploadTransferImages(node, fileList) {
    if (node.data.locked) return;

    const existingImages = Array.isArray(node.data.transferImages) ? node.data.transferImages : [];
    const files = Array.from(fileList || [])
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, maxTransferImages - existingImages.length);

    if (!files.length) return;

    pushUndoSnapshot();
    updateNode(node.id, {
      status: "uploading",
      error: "",
      activated: false,
      resultUrl: ""
    });

    try {
      const uploadedImages = [];
      for (const file of files) {
        const form = new FormData();
        form.append("asset", file);
        form.append("nodeType", "transfer");

        const response = await fetch("/api/node/upload-asset", {
          method: "POST",
          body: form
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Upload failed.");

        uploadedImages.push({
          id: `transfer-image-${Date.now()}-${uploadedImages.length}`,
          fileName: data.asset.fileName,
          storedFileName: data.asset.storedFileName,
          mimeType: data.asset.mimeType,
          localUrl: data.asset.localUrl
        });
      }

      updateNode(node.id, {
        transferImages: [...existingImages, ...uploadedImages].slice(0, maxTransferImages),
        status: "ready",
        error: ""
      });
    } catch (error) {
      updateNode(node.id, {
        status: "error",
        error: error.message
      });
    }
  }

  function removeTransferImage(nodeId, imageId) {
    pushUndoSnapshot();
    updateNode(nodeId, {
      transferImages: nodes.find((node) => node.id === nodeId)?.data.transferImages?.filter((image) => image.id !== imageId) || [],
      activated: false,
      locked: false,
      resultUrl: "",
      fileName: "",
      error: ""
    });
    setEdges((current) => current.filter((edge) => edge.from.nodeId !== nodeId));
    setSelectedEdgeId(null);
  }

  function startPreviewResize(event, node) {
    event.preventDefault();
    event.stopPropagation();
    pushUndoSnapshot();
    event.currentTarget.setPointerCapture(event.pointerId);
    const pointer = screenToScene(event.clientX, event.clientY);
    setDragState({
      type: "previewResize",
      nodeId: node.id,
      startPointer: pointer,
      startScale: Number(node.data.previewScale || 1)
    });
  }

  async function activateTransferNode(node) {
    const transferImages = Array.isArray(node.data.transferImages) ? node.data.transferImages.filter((image) => image.localUrl) : [];
    if (!transferImages.length) {
      updateNode(node.id, { error: "Upload at least one image." });
      return;
    }

    try {
      setCompilingTransferNodeId(node.id);
      updateNode(node.id, { status: "compiling", error: "" });
      const collageBlob = await createTransferCollageBlob(transferImages);
      const transferFile = new File([collageBlob], "TRANSFER.png", { type: "image/png" });
      const form = new FormData();
      form.append("asset", transferFile);
      form.append("nodeId", node.id);

      const response = await fetch("/api/node/upload-transfer-collage", {
        method: "POST",
        body: form
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not compile TRANSFER.png.");

      pushUndoSnapshot();
      updateNode(node.id, {
        activated: true,
        locked: true,
        resultUrl: data.asset.localUrl,
        fileName: data.asset.fileName,
        storedFileName: data.asset.storedFileName,
        mimeType: data.asset.mimeType,
        hiddenPrompt: transferPromptSuffix,
        status: "ready",
        error: ""
      });
    } catch (error) {
      updateNode(node.id, { status: "error", error: error.message });
    } finally {
      setCompilingTransferNodeId(null);
    }
  }

  function unlockTransferNode(nodeId) {
    pushUndoSnapshot();
    updateNode(nodeId, {
      activated: false,
      locked: false,
      resultUrl: "",
      fileName: "",
      status: "ready",
      error: ""
    });
  }

  function startNodeDrag(event, node) {
    if (event.target.closest("input, textarea, select, button, label, summary, details, .preview-resize-handle")) return;
    event.stopPropagation();
    const selectedIds = selectNodeForDrag(node.id, event.shiftKey);
    pushUndoSnapshot();
    event.currentTarget.setPointerCapture(event.pointerId);
    const pointer = screenToScene(event.clientX, event.clientY);
    setDragState({
      type: "nodes",
      startPointer: pointer,
      nodes: nodes
        .filter((item) => selectedIds.includes(item.id))
        .map((item) => ({
          id: item.id,
          x: item.x,
          y: item.y
        }))
    });
  }

  function handlePointerMove(event) {
    const pointer = screenToScene(event.clientX, event.clientY);

    if (dragState?.type === "pan") {
      event.preventDefault();
      setViewport({
        ...dragState.viewport,
        x: dragState.viewport.x + event.clientX - dragState.startClient.x,
        y: dragState.viewport.y + event.clientY - dragState.startClient.y
      });
      return;
    }

    if (dragState?.type === "nodes") {
      const deltaX = pointer.x - dragState.startPointer.x;
      const deltaY = pointer.y - dragState.startPointer.y;
      const dragged = new Map(dragState.nodes.map((item) => [item.id, item]));
      setNodes((current) =>
        current.map((node) => {
          const start = dragged.get(node.id);
          return start
            ? {
                ...node,
                x: start.x + deltaX,
                y: start.y + deltaY
              }
            : node;
        })
      );
    }

    if (dragState?.type === "group") {
      const deltaX = pointer.x - dragState.startPointer.x;
      const deltaY = pointer.y - dragState.startPointer.y;
      const dragged = new Map(dragState.nodes.map((item) => [item.id, item]));

      setGroups((current) =>
        current.map((group) =>
          group.id === dragState.groupId
            ? {
                ...group,
                x: dragState.group.x + deltaX,
                y: dragState.group.y + deltaY
              }
            : group
        )
      );
      setNodes((current) =>
        current.map((node) => {
          const start = dragged.get(node.id);
          return start
            ? {
                ...node,
                x: start.x + deltaX,
                y: start.y + deltaY
              }
            : node;
        })
      );
      return;
    }

    if (dragState?.type === "groupResize") {
      const deltaX = pointer.x - dragState.startPointer.x;
      const deltaY = pointer.y - dragState.startPointer.y;
      setGroups((current) =>
        current.map((group) =>
          group.id === dragState.groupId
            ? {
                ...group,
                width: Math.round(clamp(dragState.group.width + deltaX, groupMinWidth, 4200)),
                height: Math.round(clamp(dragState.group.height + deltaY, groupMinHeight, 3200))
              }
            : group
        )
      );
      return;
    }

    if (dragState?.type === "marquee") {
      const rect = normalizeRect(dragState.start, pointer);
      const selected = nodes
        .filter((node) => rectsIntersect(rect, getNodeBounds(node.id)))
        .map((node) => node.id);
      setDragState((current) => (current?.type === "marquee" ? { ...current, current: pointer } : current));
      setSelectedNodeIds([...new Set([...dragState.baseSelection, ...selected])]);
    }

    if (dragState?.type === "previewResize") {
      const deltaX = pointer.x - dragState.startPointer.x;
      const deltaY = pointer.y - dragState.startPointer.y;
      const nextScale = clamp(dragState.startScale + Math.max(deltaX, deltaY) / previewBaseWidth, 1, 3);
      updateNode(dragState.nodeId, { previewScale: roundPreviewScale(nextScale) });
    }

    if (draftEdge) {
      setDraftEdge((current) => ({
        ...current,
        x: pointer.x,
        y: pointer.y
      }));
    }
  }

  function stopNodeDrag() {
    setDragState(null);
  }

  function selectNodeForDrag(nodeId, shouldAdd) {
    let nextSelected;
    if (shouldAdd) {
      nextSelected = selectedNodeSet.has(nodeId) ? selectedNodeIds : [...selectedNodeIds, nodeId];
    } else {
      nextSelected = selectedNodeSet.has(nodeId) ? selectedNodeIds : [nodeId];
    }

    setSelectedNodeIds(nextSelected);
    setSelectedEdgeId(null);
    return nextSelected;
  }

  function startCanvasPointerDown(event) {
    if (!isCanvasSurface(event.target, event.currentTarget)) return;
    setContextMenu(null);
    setSelectedEdgeId(null);
    const pointer = screenToScene(event.clientX, event.clientY);

    if (event.shiftKey) {
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragState({
        type: "marquee",
        start: pointer,
        current: pointer,
        baseSelection: selectedNodeIds
      });
      return;
    }

    setSelectedNodeIds([]);
    if (event.button !== 0) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragState({
      type: "pan",
      startClient: {
        x: event.clientX,
        y: event.clientY
      },
      viewport
    });
  }

  function openCanvasContextMenu(event) {
    if (event.target.closest("[data-node-card-id]")) return;
    event.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const menuPosition = clampContextMenuPosition(event.clientX - rect.left, event.clientY - rect.top, rect);
    setContextMenu({
      x: menuPosition.x,
      y: menuPosition.y,
      scene: screenToScene(event.clientX, event.clientY)
    });
  }

  function startConnection(event, nodeId, port, color) {
    event.preventDefault();
    event.stopPropagation();
    setSelectedEdgeId(null);
    const pointer = screenToScene(event.clientX, event.clientY);
    const startPoint = getPortPoint(nodeId, port);
    setDraftEdge({
      from: { nodeId, port },
      color,
      start: startPoint,
      x: pointer.x,
      y: pointer.y
    });
  }

  function disconnectInputPort(event, nodeId, port) {
    event.preventDefault();
    event.stopPropagation();
    pushUndoSnapshot();
    setEdges((current) => current.filter((edge) => !(edge.to.nodeId === nodeId && edge.to.port === port)));
    setSelectedEdgeId(null);
    setDraftEdge(null);
    setSaveStatus("Disconnected input");
  }

  function selectEdge(event, edgeId) {
    event.preventDefault();
    event.stopPropagation();
    setSelectedNodeIds([]);
    setSelectedEdgeId(edgeId);
    setContextMenu(null);
  }

  function handleCanvasWheel(event) {
    const isInteractiveControl = event.target.closest("input, textarea, select");
    if (isInteractiveControl && !event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    event.stopPropagation();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const pointer = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    if (event.ctrlKey || event.metaKey) {
      setViewport((current) => {
        const zoomFactor = Math.exp(-event.deltaY * 0.006);
        const nextScale = clamp(current.scale * zoomFactor, minZoom, maxZoom);
        const scenePoint = {
          x: (pointer.x - current.x) / current.scale,
          y: (pointer.y - current.y) / current.scale
        };

        return {
          x: pointer.x - scenePoint.x * nextScale,
          y: pointer.y - scenePoint.y * nextScale,
          scale: nextScale
        };
      });
      return;
    }

    setViewport((current) => ({
      ...current,
      x: current.x - event.deltaX,
      y: current.y - event.deltaY
    }));
  }

  function screenToScene(clientX, clientY) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left - viewport.x) / viewport.scale,
      y: (clientY - rect.top - viewport.y) / viewport.scale
    };
  }

  function getNodeBounds(nodeId) {
    const canvas = canvasRef.current;
    const element = canvas?.querySelector(`[data-node-card-id="${nodeId}"]`);
    if (!canvas || !element) return { left: 0, top: 0, right: 0, bottom: 0 };

    const canvasRect = canvas.getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    return {
      left: (rect.left - canvasRect.left - viewport.x) / viewport.scale,
      top: (rect.top - canvasRect.top - viewport.y) / viewport.scale,
      right: (rect.right - canvasRect.left - viewport.x) / viewport.scale,
      bottom: (rect.bottom - canvasRect.top - viewport.y) / viewport.scale
    };
  }

  function getNodeIdsInsideGroup(group) {
    const groupRect = groupToRect(group);
    return nodes
      .filter((node) => {
        const bounds = getNodeBounds(node.id);
        if (bounds.right > bounds.left && bounds.bottom > bounds.top) {
          return pointInRect(groupRect, {
            x: (bounds.left + bounds.right) / 2,
            y: (bounds.top + bounds.bottom) / 2
          });
        }

        return pointInRect(groupRect, node);
      })
      .map((node) => node.id);
  }

  function finishConnection(event) {
    if (dragState?.type === "marquee") {
      stopNodeDrag();
      return;
    }

    if (!draftEdge) {
      stopNodeDrag();
      return;
    }

    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-port-role='input']");
    if (target) {
      const to = {
        nodeId: target.dataset.nodeId,
        port: target.dataset.portId
      };

      if (to.nodeId !== draftEdge.from.nodeId) {
        const connectionError = getConnectionError(draftEdge.from, to);
        if (connectionError) {
          setSaveStatus(connectionError);
          setDraftEdge(null);
          stopNodeDrag();
          return;
        }

        pushUndoSnapshot();
        setEdges((current) => {
          let nextEdges = current.filter(
            (edge) => !(edge.from.nodeId === draftEdge.from.nodeId && edge.from.port === draftEdge.from.port && edge.to.nodeId === to.nodeId && edge.to.port === to.port)
          );

          return [
            ...nextEdges,
            {
              id: `edge-${Date.now()}`,
              from: draftEdge.from,
              to,
              color: draftEdge.color
            }
          ];
        });
      }
    }

    setDraftEdge(null);
    stopNodeDrag();
  }

  function canCreateEdge(from, to) {
    return !getConnectionError(from, to);
  }

  function getConnectionError(from, to) {
    const source = nodes.find((node) => node.id === from.nodeId);
    const target = nodes.find((node) => node.id === to.nodeId);

    if (!source || !target) return "Choose a valid connection";

    if (source.type === "camera") {
      if (!hasCameraPreset(source)) return "Choose a Camera preset before connecting";
      if (target.type === "imageModel" && to.port === "cameraIn") return "";
      return "Camera connects to the Image Model camera input";
    }

    if (source?.type === "style") {
      if ((source.data.stylePreset || "None") === "None") return "Choose a Style preset before connecting";
      if ((target.type === "imageModel" || target.type === "text") && to.port === "styleIn") return "";
      return "Style presets connect to Style inputs";
    }

    if (source.type === "transfer") {
      if (!source.data.activated || !source.data.resultUrl) return "Lock Transfer to enable TRANSFER.png output";
      if ((target.type === "imageModel" && to.port === "transferIn") || (target.type === "preview" && to.port === "sourceIn")) return "";
      return "Transfer connects to the Image Model transfer input or previews";
    }

    if (target?.type === "preview") {
      if (["image", "video", "imageModel", "videoModel", "transfer"].includes(source?.type)) return "";
      return "Preview accepts image and video sources";
    }

    if (target?.type === "text") {
      if (to.port === "textIn") {
        if (["text", "imageModel", "videoModel"].includes(source.type)) return "";
        return "Text input accepts text outputs";
      }

      if (to.port === "imageIn") {
        if (["image", "imageModel", "transfer"].includes(source.type)) return "";
        return "Image input accepts image outputs";
      }

      if (to.port === "videoIn") {
        if (["video", "videoModel"].includes(source.type)) return "";
        return "Video input accepts video outputs";
      }

      if (to.port === "styleIn") {
        if (source.type === "style") return "";
        return "Style input accepts style outputs";
      }
    }

    return "";
  }

  function getPortPoint(nodeId, port) {
    return portPositions[`${nodeId}:${port}`] || { x: 0, y: 0 };
  }

  function pushUndoSnapshot() {
    undoStackRef.current = [
      ...undoStackRef.current.slice(-39),
      cloneGraphState({ nodes, edges, groups, viewport, selectedNodeIds, selectedEdgeId })
    ];
  }

  function undoGraphChange() {
    const previous = undoStackRef.current.pop();
    if (!previous) {
      setSaveStatus("Nothing to undo");
      return;
    }

    setNodes(previous.nodes);
    setEdges(previous.edges);
    setGroups(previous.groups || []);
    setViewport(previous.viewport);
    setSelectedNodeIds(previous.selectedNodeIds);
    setSelectedEdgeId(previous.selectedEdgeId || null);
    setSaveStatus("Undone");
  }

  function copySelection() {
    if (!selectedNodeIds.length) return;

    const ids = new Set(selectedNodeIds);
    clipboardRef.current = {
      nodes: nodes.filter((node) => ids.has(node.id)).map((node) => cloneNode(node)),
      edges: edges.filter((edge) => ids.has(edge.from.nodeId) && ids.has(edge.to.nodeId)).map((edge) => cloneEdge(edge))
    };
    setSaveStatus(`${selectedNodeIds.length} node${selectedNodeIds.length === 1 ? "" : "s"} copied`);
  }

  function pasteSelection() {
    const clipboard = clipboardRef.current;
    if (!clipboard?.nodes?.length) return;

    pushUndoSnapshot();
    const stamp = Date.now();
    const idMap = new Map();
    const pastedNodes = clipboard.nodes.map((node, index) => {
      const nextId = `${node.type}-${stamp}-${index}`;
      const nextNode = cloneNode(node);
      idMap.set(node.id, nextId);
      return {
        ...nextNode,
        id: nextId,
        x: node.x + 42,
        y: node.y + 42,
        data: {
          ...nextNode.data,
          title: `${node.data.title || node.type} Copy`
        }
      };
    });
    const pastedEdges = clipboard.edges
      .filter((edge) => idMap.has(edge.from.nodeId) && idMap.has(edge.to.nodeId))
      .map((edge, index) => ({
        ...cloneEdge(edge),
        id: `edge-${stamp}-${index}`,
        from: {
          ...edge.from,
          nodeId: idMap.get(edge.from.nodeId)
        },
        to: {
          ...edge.to,
          nodeId: idMap.get(edge.to.nodeId)
        }
      }));

    setNodes((current) => [...current, ...pastedNodes]);
    setEdges((current) => [...current, ...pastedEdges]);
    setSelectedNodeIds(pastedNodes.map((node) => node.id));
    setSelectedEdgeId(null);
    setSaveStatus(`${pastedNodes.length} node${pastedNodes.length === 1 ? "" : "s"} pasted`);
  }

  async function loadProjects() {
    try {
      const response = await fetch("/api/saved-workflows");
      if (!response.ok) throw new Error("Could not load saved workflows.");
      const projectList = await response.json();
      setProjects(projectList);
      if (projectId && !savedProjectName) {
        const currentProject = projectList.find((project) => project.id === projectId);
        if (currentProject?.name) setSavedProjectName(currentProject.name);
      }
    } catch (error) {
      setSaveStatus(error.message);
    }
  }

  async function saveProject() {
    try {
      const cleanProjectName = String(projectName || "").trim() || "Untitled node project";
      const lastSavedName = String(savedProjectName || selectedProjectName || "").trim();
      const shouldCreateNewProject = Boolean(projectId && lastSavedName && cleanProjectName !== lastSavedName);

      setSaveStatus("Saving...");
      const response = await fetch("/api/saved-workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: shouldCreateNewProject ? null : projectId,
          name: cleanProjectName,
          nodes,
          edges,
          groups,
          viewport
        })
      });
      const project = await response.json();
      if (!response.ok) throw new Error(project.error || "Could not save workflow.");
      setProjectId(project.id);
      setProjectName(project.name);
      setSavedProjectName(project.name);
      setSaveStatus(project.fileName ? `Saved ${project.fileName}` : shouldCreateNewProject ? "Saved as new workflow" : "Saved");
      await loadProjects();
    } catch (error) {
      setSaveStatus(error.message);
    }
  }

  function applyWorkflow(project, sourceLabel = "Loaded") {
    const graph = normalizeEditorGraph(project.graph?.nodes || [], project.graph?.edges || [], project.graph?.groups || []);
    setProjectId(project.id || null);
    setProjectName(project.name || "Untitled node project");
    setSavedProjectName(project.name || null);
    setNodes(graph.nodes);
    setEdges(graph.edges);
    setGroups(graph.groups);
    setViewport(project.graph?.viewport || { x: 0, y: 0, scale: 1 });
    setSelectedNodeIds([]);
    setSelectedEdgeId(null);
    setProjectMenuOpen(false);
    setSaveStatus(project.fileName ? `${sourceLabel} ${project.fileName}` : sourceLabel);
  }

  async function openWorkflowFile(file) {
    if (!file) return;

    try {
      const project = JSON.parse(await file.text());
      if (!project?.graph || !Array.isArray(project.graph.nodes) || !Array.isArray(project.graph.edges)) {
        throw new Error("That JSON file is not a NewtNode workflow.");
      }

      applyWorkflow(
        {
          ...project,
          id: project.id || null,
          name: project.name || file.name.replace(/\.json$/i, "") || "Untitled node project",
          fileName: file.name
        },
        "Opened"
      );
    } catch (error) {
      setSaveStatus(error.message || "Could not open workflow.");
    } finally {
      if (workflowFileInputRef.current) {
        workflowFileInputRef.current.value = "";
      }
    }
  }

  async function loadProject(id) {
    if (!id) return;

    try {
      const selectedProject = projects.find((project) => project.id === id || project.fileName === id);
      const fileName = selectedProject?.fileName || id;
      const response = await fetch(`/api/saved-workflows/${encodeURIComponent(fileName)}`);
      const project = await response.json();
      if (!response.ok) throw new Error(project.error || "Could not load workflow.");
      applyWorkflow(project, "Loaded");
    } catch (error) {
      setSaveStatus(error.message);
    }
  }

  async function deleteProject(project) {
    if (!window.confirm(`Delete "${project.name}"?`)) return;

    try {
      const response = await fetch(`/api/saved-workflows/${encodeURIComponent(project.fileName || project.id)}`, {
        method: "DELETE"
      });
      const nextProjects = await response.json();
      if (!response.ok) throw new Error(nextProjects.error || "Could not delete workflow.");
      setProjects(nextProjects);
      if (projectId === project.id) {
        setProjectId(null);
        setProjectName("Untitled node project");
        setSavedProjectName(null);
      }
      setProjectMenuOpen(false);
      setSaveStatus("Workflow deleted");
    } catch (error) {
      setSaveStatus(error.message);
    }
  }

  async function runNode(node) {
    const currentNode = nodesRef.current.find((item) => item.id === node.id) || node;
    if (!isRunnableNode(currentNode)) return { status: "skipped" };
    if (currentNode.data.status === "running") return { status: "skipped" };

    const currentIncomingByNode = buildIncomingByNode(nodesRef.current, edgesRef.current);
    const incoming = currentIncomingByNode[currentNode.id] || {};
    const basePrompt = connectedText(incoming.promptIn) || currentNode.data.prompt;
    const isSingleRunSegmentation =
      (currentNode.type === "imageModel" && isSam3ImageModel(currentNode.data.model)) ||
      (currentNode.type === "videoModel" && isSam3VideoModel(currentNode.data.model));
    const batchCount = isSingleRunSegmentation ? 1 : nodeBatchCount(currentNode);

    try {
      const runningPatch =
        currentNode.type === "text"
          ? { status: "running", error: "" }
          : { status: "running", error: "", resultUrl: "", resultItems: [], selectedResultIndex: 0 };
      updateNode(currentNode.id, runningPatch);

      if (currentNode.type === "text") {
        const processed = await runTextNodeProcessing({ node: currentNode, incoming, projectId, projectName });
        updateNode(currentNode.id, {
          status: "complete",
          error: "",
          resultText: processed.text,
          lastRunModel: processed.model
        });
        return { status: "complete" };
      }

      if (currentNode.type === "imageModel") {
        const isSegmentation = isSam3ImageModel(currentNode.data.model);
        const imagePromptItems = connectedImagePromptItems(isSegmentation ? incoming.imagePromptIn || [] : [...(incoming.imagePromptIn || []), ...(incoming.transferIn || [])]);
        const prompt = isSegmentation
          ? basePrompt
          : buildEffectiveImagePrompt(basePrompt, [...(incoming.cameraIn || []), ...(incoming.styleIn || []), ...(incoming.transferIn || [])], currentNode.data.aspectRatio);
        const runIndexes = Array.from({ length: batchCount }, (_, index) => index);
        const settled = await settleSequential(runIndexes, (index) =>
          runImageModelGeneration({
            node: currentNode,
            prompt,
            imagePromptItems,
            projectId,
            projectName,
            index
          }),
          imageRunStaggerMs
        );
        const successes = settled.filter((item) => item.status === "fulfilled").map((item) => item.value);
        const failures = settled.filter((item) => item.status === "rejected");
        if (!successes.length) throw new Error(failures[0]?.reason?.message || "Image generation failed.");

        updateNode(currentNode.id, {
          status: "complete",
          resultUrl: successes[0].url,
          resultItems: successes,
          selectedResultIndex: 0,
          resultText: successes.map((item) => item.text).filter(Boolean).join("\n\n"),
          error: failures.length ? nodeBatchStatusMessage("image", batchCount, successes.length, failures) : ""
        });
        return { status: "complete" };
      }

      const prompt = basePrompt;
      const runs = Array.from({ length: batchCount }, (_, index) =>
        runVideoModelGeneration({
          node: currentNode,
          prompt,
          incoming,
          projectId,
          projectName,
          index
        })
      );
      const settled = await Promise.allSettled(runs);
      const successes = settled.filter((item) => item.status === "fulfilled").map((item) => item.value);
      const failures = settled.filter((item) => item.status === "rejected");
      if (!successes.length) throw new Error(failures[0]?.reason?.message || "Video generation failed.");

      updateNode(currentNode.id, {
        status: "complete",
        resultUrl: successes[0].url,
        resultItems: successes,
        selectedResultIndex: 0,
        resultText: "",
        error: failures.length ? nodeBatchStatusMessage("video", batchCount, successes.length, failures) : ""
      });
      return { status: "complete" };
    } catch (error) {
      updateNode(currentNode.id, { status: "error", error: error.message });
      return { status: "error", error };
    }
  }

  async function runSelectedNodes() {
    const selectedIds = new Set(selectedNodeIds);
    const runnable = nodesRef.current.filter((node) => selectedIds.has(node.id) && isRunnableNode(node) && node.data.status !== "running");
    if (!runnable.length) {
      setSaveStatus("No runnable selected nodes");
      return;
    }

    setSaveStatus(`Running ${runnable.length} selected node${runnable.length === 1 ? "" : "s"}...`);
    const result = await runNodesByDependencyOrder(runnable);
    const failedCount = result.failed + result.skipped;
    setSaveStatus(
      failedCount
        ? `Finished ${result.completed} node${result.completed === 1 ? "" : "s"}; ${failedCount} blocked or failed`
        : `Finished ${result.completed} selected node${result.completed === 1 ? "" : "s"}`
    );
  }

  async function runNodesByDependencyOrder(runnableNodes) {
    const nodeMap = new Map(runnableNodes.map((node) => [node.id, node]));
    const pending = new Set(nodeMap.keys());
    const completed = new Set();
    const failed = new Map();
    const skipped = new Map();
    const dependencies = buildSelectedRunnableDependencies(runnableNodes, edgesRef.current);

    while (pending.size) {
      const blocked = [...pending].filter((nodeId) => (dependencies.get(nodeId) || []).some((dependencyId) => failed.has(dependencyId) || skipped.has(dependencyId)));

      blocked.forEach((nodeId) => {
        const failedDependencyId = (dependencies.get(nodeId) || []).find((dependencyId) => failed.has(dependencyId) || skipped.has(dependencyId));
        const message = `Skipped because ${nodeTitle(nodeMap.get(failedDependencyId))} did not complete.`;
        pending.delete(nodeId);
        skipped.set(nodeId, message);
        updateNode(nodeId, { status: "error", error: message });
      });

      const ready = [...pending].filter((nodeId) => (dependencies.get(nodeId) || []).every((dependencyId) => completed.has(dependencyId)));

      if (!ready.length) {
        [...pending].forEach((nodeId) => {
          const message = "Skipped because selected node dependencies could not be resolved.";
          pending.delete(nodeId);
          skipped.set(nodeId, message);
          updateNode(nodeId, { status: "error", error: message });
        });
        break;
      }

      const nextPriority = Math.min(...ready.map((nodeId) => nodeRunPriority(nodeMap.get(nodeId))));
      const batchIds = ready.filter((nodeId) => nodeRunPriority(nodeMap.get(nodeId)) === nextPriority);
      const batchNodes = batchIds.map((nodeId) => nodeMap.get(nodeId));
      setSaveStatus(`Running ${batchNodes.length} ${runStageLabel(batchNodes[0]?.type)} node${batchNodes.length === 1 ? "" : "s"}...`);

      const results = await Promise.all(batchNodes.map((node) => runNode(node)));
      results.forEach((result, index) => {
        const nodeId = batchIds[index];
        pending.delete(nodeId);

        if (result?.status === "error") {
          failed.set(nodeId, result.error || new Error("Node failed."));
          return;
        }

        completed.add(nodeId);
      });

      await wait(0);
    }

    return {
      completed: completed.size,
      failed: failed.size,
      skipped: skipped.size
    };
  }

  return (
    <section className={`node-workspace ${toolbarCollapsed ? "toolbar-collapsed" : ""}`}>
      {toolbarCollapsed && (
        <button className="sidebar-restore" onClick={() => setToolbarCollapsed(false)} title="Show node palette">
          <PanelLeftOpen size={17} />
        </button>
      )}

      <aside className="node-toolbar">
        <div className="toolbar-header">
          <span>Nodes</span>
          <button className="sidebar-hide" onClick={() => setToolbarCollapsed(true)} title="Hide node palette">
            <PanelLeftClose size={16} />
          </button>
        </div>
        <div className="project-tools">
          <input value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="Project name" />
          <button onClick={saveProject} title="Save project">
            <Save size={16} />
            <span>Save</span>
          </button>
          <button onClick={() => workflowFileInputRef.current?.click()} title="Open workflow JSON">
            <FolderOpen size={16} />
            <span>Open</span>
          </button>
          <input
            ref={workflowFileInputRef}
            className="workflow-file-input"
            type="file"
            accept="application/json,.json"
            onChange={(event) => openWorkflowFile(event.target.files?.[0])}
          />
          <div className="project-picker" ref={projectMenuRef}>
            <button className="project-picker-trigger" onClick={() => setProjectMenuOpen((open) => !open)} title="Load saved workflow">
              <span>{selectedProjectName || "Load workflow"}</span>
              <ChevronDown size={13} />
            </button>
            {projectMenuOpen && (
              <div className="project-menu">
                {projects.length ? (
                  projects.map((project) => (
                    <div className="project-menu-row" key={project.id}>
                      <button className="project-load" onClick={() => loadProject(project.id)} title={`Load ${project.fileName || project.name}`}>
                        {project.name}
                      </button>
                      <button className="project-delete" onClick={() => deleteProject(project)} title={`Delete ${project.fileName || project.name}`}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))
                ) : (
                  <small>No saved workflows</small>
                )}
              </div>
            )}
          </div>
          {saveStatus && <small>{saveStatus}</small>}
        </div>
        {nodeCatalog.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.type} onClick={() => addNode(item.type)} title={`Add ${item.label}`}>
              <Icon size={17} />
              <span>{item.label}</span>
              <Plus size={14} />
            </button>
          );
        })}
      </aside>

      <div
        ref={canvasRef}
        className="node-canvas"
        style={{
          "--grid-size": `${28 * viewport.scale}px`,
          "--grid-x": `${positiveModulo(viewport.x, 28 * viewport.scale)}px`,
          "--grid-y": `${positiveModulo(viewport.y, 28 * viewport.scale)}px`
        }}
        onPointerDown={startCanvasPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishConnection}
        onPointerCancel={stopNodeDrag}
        onContextMenu={openCanvasContextMenu}
      >
        <div
          className="node-scene"
          style={{
            transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.scale})`
          }}
        >
          {groups.map((group) => (
            <GroupBackdrop
              key={group.id}
              group={group}
              onDragStart={startGroupDrag}
              onResizeStart={startGroupResize}
              onUpdate={updateGroup}
              onRemove={removeGroup}
            />
          ))}

          <svg className="edge-layer">
            {edges.map((edge) => {
              const from = getPortPoint(edge.from.nodeId, edge.from.port);
              const to = getPortPoint(edge.to.nodeId, edge.to.port);
              return (
                <EdgePath
                  key={edge.id}
                  edgeId={edge.id}
                  from={from}
                  to={to}
                  color={edge.color}
                  selected={selectedEdgeId === edge.id}
                  active={activeEdgeIds.has(edge.id)}
                  inactive={inactiveEdgeIds.has(edge.id)}
                  onSelect={selectEdge}
                />
              );
            })}
          {draftEdge && <EdgePath from={draftEdge.start} to={{ x: draftEdge.x, y: draftEdge.y }} color={draftEdge.color} draft />}
          {dragState?.type === "marquee" && <SelectionMarquee start={dragState.start} current={dragState.current} />}
          </svg>

          {nodes.map((node) => (
            <NodeCard
              key={node.id}
              node={node}
              onDragStart={startNodeDrag}
              onRemove={removeNode}
              onUpdate={updateNode}
              onConnectStart={startConnection}
              onDisconnectInput={disconnectInputPort}
              connectedPortKeys={connectedPortKeys}
              incoming={incomingByNode[node.id] || {}}
              onRun={runNode}
              onUpload={uploadMediaAsset}
              onTransferImagesUpload={uploadTransferImages}
              onTransferImageRemove={removeTransferImage}
              onTransferActivate={activateTransferNode}
              onTransferUnlock={unlockTransferNode}
              onPreviewResizeStart={startPreviewResize}
              running={node.data.status === "running"}
              transferCompiling={compilingTransferNodeId === node.id}
              selected={selectedNodeSet.has(node.id)}
            />
          ))}
        </div>
        {selectionBounds && (
          <SelectionActionBar
            bounds={selectionBounds}
            viewport={viewport}
            selectedCount={selectedNodeIds.length}
            runnableCount={selectedRunnableNodes.length}
            onRunAll={runSelectedNodes}
            onGroup={createGroupFromSelection}
          />
        )}
        {contextMenu && (
          <div className="node-context-menu" style={{ left: contextMenu.x, top: contextMenu.y }}>
            {nodeCatalog.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.type} onClick={() => addNode(item.type, contextMenu.scene)}>
                  <Icon size={15} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
        <div className="zoom-readout">{Math.round(viewport.scale * 100)}%</div>
      </div>
    </section>
  );
}

function EdgePath({ edgeId, from, to, color, draft, selected, active, inactive, onSelect }) {
  const curve = Math.max(80, Math.abs(to.x - from.x) * 0.42);
  const path = `M ${from.x} ${from.y} C ${from.x + curve} ${from.y}, ${to.x - curve} ${to.y}, ${to.x} ${to.y}`;
  return (
    <g className={`edge-path ${draft ? "draft" : ""} ${selected ? "selected" : ""} ${active ? "active" : ""} ${inactive ? "inactive" : ""}`}>
      <path className="edge-visible" d={path} stroke={color} strokeWidth={draft ? 3 : 4} fill="none" opacity={draft ? 0.62 : 0.42} strokeLinecap="round" />
      {!draft && (
        <path
          className="edge-hitbox"
          d={path}
          fill="none"
          stroke="transparent"
          strokeWidth="18"
          strokeLinecap="round"
          onPointerDown={(event) => onSelect?.(event, edgeId)}
        />
      )}
    </g>
  );
}

function SelectionMarquee({ start, current }) {
  const rect = normalizeRect(start, current);
  return (
    <rect
      className="selection-marquee"
      x={rect.left}
      y={rect.top}
      width={rect.right - rect.left}
      height={rect.bottom - rect.top}
      rx="8"
    />
  );
}

function SelectionActionBar({ bounds, viewport, selectedCount, runnableCount, onRunAll, onGroup }) {
  const x = viewport.x + (bounds.left + bounds.width / 2) * viewport.scale;
  const y = viewport.y + bounds.top * viewport.scale - 54;

  return (
    <div className="selection-action-bar" style={{ left: x, top: y }} onPointerDown={(event) => event.stopPropagation()}>
      <span className="selection-action-dot" aria-hidden="true" />
      <span className="selection-action-divider" aria-hidden="true" />
      <button onClick={onRunAll} disabled={!runnableCount} title={runnableCount ? `Run ${runnableCount} selected node${runnableCount === 1 ? "" : "s"}` : "No runnable selected nodes"}>
        <Play size={18} />
        <span>Run All</span>
      </button>
      <button onClick={onGroup} disabled={selectedCount < 2} title="Group selected nodes">
        <Plus size={17} />
        <span>Group</span>
      </button>
    </div>
  );
}

function GroupBackdrop({ group, onDragStart, onResizeStart, onUpdate, onRemove }) {
  const color = group.color || groupPalette[0];

  return (
    <section
      className="node-group-backdrop"
      style={{
        transform: `translate(${group.x}px, ${group.y}px)`,
        width: group.width,
        height: group.height,
        "--group-color": color
      }}
      onPointerDown={(event) => onDragStart(event, group)}
    >
      <div className="group-header">
        <input
          value={group.name || ""}
          onChange={(event) => onUpdate(group.id, { name: event.target.value })}
          onBlur={(event) => {
            if (!event.target.value.trim()) onUpdate(group.id, { name: "Group" });
          }}
          onPointerDown={(event) => event.stopPropagation()}
          aria-label="Group name"
        />
        <div className="group-color-row" onPointerDown={(event) => event.stopPropagation()}>
          {groupPalette.map((swatch) => (
            <button
              key={swatch}
              className={`group-color-swatch ${swatch === color ? "active" : ""}`}
              style={{ "--swatch-color": swatch }}
              onClick={() => onUpdate(group.id, { color: swatch })}
              title="Set group color"
            />
          ))}
        </div>
        <button className="group-remove" onClick={() => onRemove(group.id)} onPointerDown={(event) => event.stopPropagation()} title="Remove group">
          <X size={13} />
        </button>
      </div>
      <span className="group-resize-handle" onPointerDown={(event) => onResizeStart(event, group)} />
    </section>
  );
}

function isCanvasSurface(target, canvas) {
  return target === canvas || target.classList?.contains("node-scene") || target.classList?.contains("edge-layer");
}

function NodeCard({
  node,
  onDragStart,
  onRemove,
  onUpdate,
  onConnectStart,
  onDisconnectInput,
  connectedPortKeys,
  incoming,
  onRun,
  onUpload,
  onTransferImagesUpload,
  onTransferImageRemove,
  onTransferActivate,
  onTransferUnlock,
  onPreviewResizeStart,
  running,
  transferCompiling,
  selected
}) {
  const config = getNodeConfig(node.type);
  const Icon = config.icon;
  const [editingTitle, setEditingTitle] = React.useState(false);
  const [draftTitle, setDraftTitle] = React.useState(node.data.title || "");

  React.useEffect(() => {
    if (!editingTitle) {
      setDraftTitle(node.data.title || "");
    }
  }, [node.data.title, editingTitle]);

  function commitTitleEdit() {
    const title = draftTitle.trim() || node.data.title || configTitleFallback(node.type);
    onUpdate(node.id, { title });
    setDraftTitle(title);
    setEditingTitle(false);
  }

  function cancelTitleEdit() {
    setDraftTitle(node.data.title || "");
    setEditingTitle(false);
  }

  return (
    <article
      className={`node-card ${node.type} ${selected ? "selected" : ""}`}
      style={{ transform: `translate(${node.x}px, ${node.y}px)`, "--preview-scale": node.data.previewScale || 1 }}
      data-node-card-id={node.id}
      onPointerDown={(event) => onDragStart(event, node)}
    >
      <div className="node-title">
        <span className="node-title-label">
          <Icon size={15} />
          {editingTitle ? (
            <input
              className="node-title-input"
              value={draftTitle}
              autoFocus
              onPointerDown={(event) => event.stopPropagation()}
              onFocus={(event) => event.target.select()}
              onChange={(event) => setDraftTitle(event.target.value)}
              onBlur={commitTitleEdit}
              onKeyDown={(event) => {
                event.stopPropagation();
                if (event.key === "Enter") {
                  event.preventDefault();
                  commitTitleEdit();
                }
                if (event.key === "Escape") {
                  event.preventDefault();
                  cancelTitleEdit();
                }
              }}
            />
          ) : (
            <span
              className="node-title-name"
              role="button"
              tabIndex={0}
              title="Rename node"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => setEditingTitle(true)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setEditingTitle(true);
                }
              }}
            >
              {node.data.title}
            </span>
          )}
        </span>
        <button onClick={() => onRemove(node.id)} title="Remove node">
          <X size={14} />
        </button>
      </div>

      <NodeBody
        node={node}
        onUpdate={onUpdate}
        incoming={incoming}
        onRun={onRun}
        running={running}
        onConnectStart={onConnectStart}
        onDisconnectInput={onDisconnectInput}
        connectedPortKeys={connectedPortKeys}
        onUpload={onUpload}
        onTransferImagesUpload={onTransferImagesUpload}
        onTransferImageRemove={onTransferImageRemove}
        onTransferActivate={onTransferActivate}
        onTransferUnlock={onTransferUnlock}
        onPreviewResizeStart={onPreviewResizeStart}
        transferCompiling={transferCompiling}
      />
    </article>
  );
}

function PortHandle({ node, port, side, onConnectStart, onDisconnectInput, connectedPortKeys }) {
  const connected = connectedPortKeys.has(`${node.id}:${port.id}`);

  return (
    <button
      className={`inline-port ${side} ${connected ? "connected" : ""}`}
      data-port-role={side}
      data-node-id={node.id}
      data-port-id={port.id}
      data-port-key={`${node.id}:${port.id}`}
      style={{ "--port-color": port.color }}
      onPointerDown={(event) => {
        if (side === "output") {
          onConnectStart(event, node.id, port.id, port.color);
          return;
        }
        onDisconnectInput(event, node.id, port.id);
      }}
      title={side === "input" ? `Disconnect ${port.label}` : `Connect ${port.label}`}
    />
  );
}

function OutputPortRow({ node, port, onConnectStart, onDisconnectInput, connectedPortKeys, label = port.label }) {
  return (
    <div className="port-row output-row">
      <span>{label}</span>
      <PortHandle
        node={node}
        port={port}
        side="output"
        onConnectStart={onConnectStart}
        onDisconnectInput={onDisconnectInput}
        connectedPortKeys={connectedPortKeys}
      />
    </div>
  );
}

function MediaPreview({ node }) {
  if (!node.data.resultUrl) {
    return (
      <div className="media-preview empty">
        <UploadIcon type={node.type} />
        <span>No upload yet</span>
      </div>
    );
  }

  if (node.type === "image") {
    return (
      <div className="media-preview">
        <img src={node.data.resultUrl} alt={node.data.fileName || "Uploaded image"} />
      </div>
    );
  }

  if (node.type === "video") {
    return (
      <div className="media-preview">
        <video src={node.data.resultUrl} controls muted />
      </div>
    );
  }

  return (
    <div className="media-preview audio">
      <FileAudio size={28} />
      <audio src={node.data.resultUrl} controls />
    </div>
  );
}

function StyleCollage({ images, locked, onRemove, onDropImages }) {
  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    onDropImages?.(event.dataTransfer.files);
  }

  if (!images.length) {
    return (
      <div className="style-collage empty" onDragOver={allowFileDrop} onDrop={handleDrop}>
        <Compass size={24} />
        <span>Drop transfer images here</span>
      </div>
    );
  }

  return (
    <div className={`style-collage count-${images.length} ${locked ? "locked" : ""}`} onDragOver={allowFileDrop} onDrop={handleDrop}>
      {images.map((image) => (
        <div className="style-collage-cell" key={image.id}>
          <img src={image.localUrl} alt={image.fileName || "Transfer reference"} />
          {!locked && (
            <button onClick={() => onRemove(image.id)} title="Remove image">
              <X size={12} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function UploadIcon({ type }) {
  if (type === "image") return <FileImage size={22} />;
  if (type === "video") return <Video size={22} />;
  if (type === "audio") return <FileAudio size={22} />;
  return <Plus size={22} />;
}

function NodeBody({
  node,
  onUpdate,
  incoming,
  onRun,
  running,
  onConnectStart,
  onDisconnectInput,
  connectedPortKeys,
  onUpload,
  onTransferImagesUpload,
  onTransferImageRemove,
  onTransferActivate,
  onTransferUnlock,
  onPreviewResizeStart,
  transferCompiling
}) {
  const config = getNodeConfig(node.type);
  const outputPort = config.output[0];

  if (node.type === "text") {
    const hasOutputPanel = Boolean(node.data.resultText) || node.data.status === "running" || node.data.status === "complete";
    const textPort = config.input.find((port) => port.id === "textIn");
    const imagePort = config.input.find((port) => port.id === "imageIn");
    const videoPort = config.input.find((port) => port.id === "videoIn");
    const stylePort = config.input.find((port) => port.id === "styleIn");
    const hasRunInput =
      Boolean(String(node.data.text || "").trim()) ||
      Boolean(incoming.textIn?.length) ||
      Boolean(incoming.imageIn?.length) ||
      Boolean(incoming.videoIn?.length) ||
      Boolean(incoming.styleIn?.length);
    return (
      <div className="node-body text-node-body">
        <OutputPortRow node={node} port={outputPort} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys} />
        <div className="text-input-port-stack" aria-label="Text node inputs">
          {[textPort, imagePort, videoPort, stylePort].filter(Boolean).map((port) => (
            <PortHandle
              key={port.id}
              node={node}
              port={port}
              side="input"
              onConnectStart={onConnectStart}
              onDisconnectInput={onDisconnectInput}
              connectedPortKeys={connectedPortKeys}
            />
          ))}
        </div>
        <div className={hasOutputPanel ? "text-split-panel" : "text-single-panel"}>
          <label className="text-field-group">
            <span>Original prompt</span>
            <textarea value={node.data.text} onChange={(event) => onUpdate(node.id, { text: event.target.value })} />
          </label>
          {hasOutputPanel && (
            <label className="text-field-group">
              <span>Output</span>
              <textarea
                value={node.data.resultText || ""}
                placeholder={running ? "Running..." : "Output will appear here"}
                onChange={(event) => onUpdate(node.id, { resultText: event.target.value })}
              />
            </label>
          )}
        </div>
        <button className="run-node-button" onClick={() => onRun(node)} disabled={running || !hasRunInput}>
          {running ? "Running..." : "Run Text"}
        </button>
        {node.data.lastRunModel && <small className="upload-status">Processed with {node.data.lastRunModel}</small>}
        {node.data.error && <small className="upload-error">{node.data.error}</small>}
      </div>
    );
  }

  if (node.type === "image" || node.type === "video" || node.type === "audio") {
    return (
      <div
        className="node-body media-node-body"
        onDragOver={allowFileDrop}
        onDrop={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const file = firstAcceptedFile(event.dataTransfer.files, node.type);
          if (file) onUpload(node, file);
        }}
      >
        <OutputPortRow node={node} port={outputPort} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys} />
        <MediaPreview node={node} />
        <label className="media-upload-card">
          <UploadIcon type={node.type} />
          <span>{node.data.resultUrl ? "Replace upload" : "Upload"}</span>
          <input type="file" accept={mediaAccept(node.type)} onChange={(event) => onUpload(node, event.target.files?.[0])} />
        </label>
        {node.data.fileName && <small>{node.data.fileName}</small>}
        {node.data.status === "uploading" && <small className="upload-status">Uploading...</small>}
        {node.data.error && <small className="upload-error">{node.data.error}</small>}
      </div>
    );
  }

  if (node.type === "camera") {
    const cameraSelected = hasCameraPreset(node);
    return (
      <div className="node-body style-only-node-body">
        {cameraSelected ? (
          <OutputPortRow node={node} port={outputPort} label={cameraLabel(node)} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys} />
        ) : (
          <div className="style-output-placeholder">Choose camera preset to enable output</div>
        )}

        <div className="style-preset-row">
          <span>Shot</span>
          <select value={node.data.shotPreset || "None"} onChange={(event) => onUpdate(node.id, { shotPreset: event.target.value })}>
            {shotPresetNames.map((presetName) => (
              <option key={presetName}>{presetName}</option>
            ))}
          </select>
        </div>
        <div className="style-preset-row">
          <span>Lens</span>
          <select value={node.data.lensPreset || "None"} onChange={(event) => onUpdate(node.id, { lensPreset: event.target.value })}>
            {lensPresetNames.map((presetName) => (
              <option key={presetName}>{presetName}</option>
            ))}
          </select>
        </div>
        <div className="style-preset-row">
          <span>Type</span>
          <select value={node.data.typePreset || "None"} onChange={(event) => onUpdate(node.id, { typePreset: event.target.value })}>
            {typePresetNames.map((presetName) => (
              <option key={presetName}>{presetName}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  if (node.type === "transfer") {
    const transferImages = Array.isArray(node.data.transferImages) ? node.data.transferImages : [];
    const canAddImages = !node.data.locked && transferImages.length < maxTransferImages;
    const hasTransferOutput = node.data.activated && node.data.resultUrl;
    const outputConnected = connectedPortKeys.has(`${node.id}:${outputPort.id}`);
    return (
      <div className="node-body style-node-body">
        {hasTransferOutput || outputConnected ? (
          <OutputPortRow node={node} port={outputPort} label="TRANSFER.png" onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys} />
        ) : (
          <div className="style-output-placeholder">Lock transfer to enable output</div>
        )}

        <StyleCollage
          images={transferImages}
          locked={node.data.locked}
          onRemove={(imageId) => onTransferImageRemove(node.id, imageId)}
          onDropImages={(files) => onTransferImagesUpload(node, files)}
        />

        <div className="style-actions">
          <label className={`style-upload-button ${!canAddImages ? "disabled" : ""}`}>
            <FileImage size={16} />
            <span>{transferImages.length ? "Add images" : "Upload images"}</span>
            <input type="file" accept="image/png,image/jpeg,image/webp" multiple disabled={!canAddImages} onChange={(event) => onTransferImagesUpload(node, event.target.files)} />
          </label>
          <button
            className={`style-lock-button ${node.data.locked ? "locked" : ""}`}
            onClick={() => (node.data.locked ? onTransferUnlock(node.id) : onTransferActivate(node))}
            disabled={transferCompiling || (!node.data.locked && !transferImages.length)}
            title={node.data.locked ? "Unlock transfer" : "Compile TRANSFER.png"}
          >
            {node.data.locked ? <Lock size={16} /> : <Unlock size={16} />}
          </button>
        </div>

        <div className="style-meta">
          <span>{transferImages.length}/{maxTransferImages}</span>
          <span>{transferCompiling ? "Compiling..." : node.data.locked ? "Locked" : "Editable"}</span>
        </div>
        {node.data.fileName && <small>{node.data.fileName}</small>}
        {node.data.status === "uploading" && <small className="upload-status">Uploading...</small>}
        {node.data.error && <small className="upload-error">{node.data.error}</small>}
      </div>
    );
  }

  if (node.type === "style") {
    const selectedPreset = node.data.stylePreset || "None";
    const styleSelected = selectedPreset !== "None";

    return (
      <div className="node-body style-only-node-body">
        {styleSelected ? (
          <OutputPortRow
            node={node}
            port={outputPort}
            label={selectedPreset}
            onConnectStart={onConnectStart}
            onDisconnectInput={onDisconnectInput}
            connectedPortKeys={connectedPortKeys}
          />
        ) : (
          <div className="style-output-placeholder">Choose style to enable output</div>
        )}

        <div className="style-preset-row">
          <span>Style</span>
          <select value={selectedPreset} onChange={(event) => onUpdate(node.id, { stylePreset: event.target.value })}>
            {stylePresetNames.map((presetName) => (
              <option key={presetName}>{presetName}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  if (node.type === "preview") {
    const previewSource = connectedPreviewSource(incoming.sourceIn);
    const sourcePort = config.input.find((port) => port.id === "sourceIn");
    return (
      <div className="node-body preview-node-body">
        <NodeRow label="Source" inputPort={sourcePort} node={node} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys}>
          <button className={previewSource ? "connected-field" : ""}>{previewSource ? previewSource.label : "Connect image or video"}</button>
        </NodeRow>
        <div className={`preview-stage ${previewSource ? "has-preview" : ""}`}>
          {previewSource?.type === "image" && <img src={previewSource.url} alt={previewSource.label} />}
          {previewSource?.type === "video" && <video src={previewSource.url} controls />}
          {!previewSource && <span>Preview will appear here</span>}
        </div>
        <button className="preview-resize-handle" onPointerDown={(event) => onPreviewResizeStart(event, node)} title="Resize preview" />
      </div>
    );
  }

  if (node.type === "imageModel") {
    const promptValue = connectedText(incoming.promptIn) || node.data.prompt;
    const promptConnected = Boolean(connectedText(incoming.promptIn));
    const isSam3Image = isSam3ImageModel(node.data.model);
    const effectivePromptValue = isSam3Image ? promptValue : buildEffectiveImagePrompt(promptValue, [...(incoming.cameraIn || []), ...(incoming.styleIn || []), ...(incoming.transferIn || [])], node.data.aspectRatio);
    const promptHasGeneratedAdditions = effectivePromptValue !== promptValue;
    const imagePromptLabel = connectedSummary(incoming.imagePromptIn, "Add file");
    const cameraPromptLabel = connectedSummary(incoming.cameraIn, "Add camera");
    const stylePromptLabel = connectedSummary(incoming.styleIn, "Add style");
    const transferPromptLabel = connectedSummary(incoming.transferIn, "Add transfer");
    const promptPort = config.input.find((port) => port.id === "promptIn");
    const imagePromptPort = config.input.find((port) => port.id === "imagePromptIn");
    const cameraPort = config.input.find((port) => port.id === "cameraIn");
    const stylePort = config.input.find((port) => port.id === "styleIn");
    const transferPort = config.input.find((port) => port.id === "transferIn");
    const settingsOpen = Boolean(node.data.settingsOpen);
    const collapsedPorts = isSam3Image ? [promptPort, imagePromptPort] : [promptPort, imagePromptPort, cameraPort, stylePort, transferPort];
    return (
      <div className="node-body model-node-body image-model-body">
        <ResultPane
          label="Results will appear here"
          resultUrl={node.data.resultUrl}
          resultItems={node.data.resultItems}
          selectedIndex={node.data.selectedResultIndex}
          type="image"
          status={node.data.status}
          error={node.data.error}
          onSelectResult={(index, item) => onUpdate(node.id, { selectedResultIndex: index, resultUrl: item.url })}
        />
        <OutputPortRow node={node} port={outputPort} label="Image output" onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys} />
        {!settingsOpen && (
          <div className="model-input-port-stack image-model-input-port-stack" aria-label="Image model inputs">
            {collapsedPorts.filter(Boolean).map((port) => (
              <PortHandle
                key={port.id}
                node={node}
                port={port}
                side="input"
                onConnectStart={onConnectStart}
                onDisconnectInput={onDisconnectInput}
                connectedPortKeys={connectedPortKeys}
              />
            ))}
          </div>
        )}
        <button className="run-node-button" onClick={() => onRun(node)} disabled={running}>
          {running ? `Running ${formatNodeBatchCount(isSam3Image ? 1 : node.data.batchCount)}...` : "Run Image"}
        </button>
        <details className="model-settings-drawer" open={settingsOpen} onToggle={(event) => onUpdate(node.id, { settingsOpen: event.currentTarget.open })}>
          <summary>Settings</summary>
          <NodeRow label="Prompt" inputPort={settingsOpen ? promptPort : null} node={node} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys}>
            <textarea className={promptConnected ? "connected-field" : ""} value={promptValue} readOnly={promptConnected} onChange={(event) => onUpdate(node.id, { prompt: event.target.value })} />
          </NodeRow>
          {promptHasGeneratedAdditions && (
            <div className="effective-prompt-preview">
              <span>Camera/style/transfer instructions applied</span>
            </div>
          )}
          <NodeRow label="Model">
            <select value={node.data.model} onChange={(event) => onUpdate(node.id, { model: event.target.value })}>
              <option>Nano Banana Pro</option>
              <option>OpenAI Image 2</option>
              {sam3SegmentationModelsEnabled && <option>SAM 3 Image</option>}
            </select>
          </NodeRow>
          <NodeRow label={isSam3Image ? "Image" : "Image Prompt"} inputPort={settingsOpen ? imagePromptPort : null} node={node} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys}>
            <button className={imagePromptLabel !== "Add file" ? "connected-field" : ""}>{imagePromptLabel}</button>
          </NodeRow>
          {!isSam3Image && (
            <>
              <NodeRow label="Camera" inputPort={settingsOpen ? cameraPort : null} node={node} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys}>
                <button className={cameraPromptLabel !== "Add camera" ? "connected-field" : ""}>{cameraPromptLabel}</button>
              </NodeRow>
              <NodeRow label="Style" inputPort={settingsOpen ? stylePort : null} node={node} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys}>
                <button className={stylePromptLabel !== "Add style" ? "connected-field" : ""}>{stylePromptLabel}</button>
              </NodeRow>
              <NodeRow label="Transfer" inputPort={settingsOpen ? transferPort : null} node={node} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys}>
                <button className={transferPromptLabel !== "Add transfer" ? "connected-field" : ""}>{transferPromptLabel}</button>
              </NodeRow>
              <NodeRow label="Generations">
                <select value={node.data.batchCount || "1"} onChange={(event) => onUpdate(node.id, { batchCount: event.target.value })}>
                  {batchOptions.map((option) => (
                    <option key={option} value={option}>
                      {formatNodeBatchCount(option)}
                    </option>
                  ))}
                </select>
              </NodeRow>
              <NodeRow label="Aspect Ratio">
                <select value={node.data.aspectRatio} onChange={(event) => onUpdate(node.id, { aspectRatio: event.target.value })}>
                  <option>21:9</option>
                  <option>16:9</option>
                  <option>1:1</option>
                  <option>9:16</option>
                </select>
              </NodeRow>
              <NodeRow label="Resolution">
                <select value={node.data.resolution} onChange={(event) => onUpdate(node.id, { resolution: event.target.value })}>
                  <option>2K</option>
                  <option>1K</option>
                  <option>4K</option>
                </select>
              </NodeRow>
            </>
          )}
        </details>
        {isSam3Image && <small className="upload-status model-status-note">segmentation model</small>}
      </div>
    );
  }

  const promptValue = connectedText(incoming.promptIn) || node.data.prompt;
  const promptConnected = Boolean(connectedText(incoming.promptIn));
  const promptPort = config.input.find((port) => port.id === "promptIn");
  const startFramePort = config.input.find((port) => port.id === "startFrameIn");
  const endFramePort = config.input.find((port) => port.id === "endFrameIn");
  const referenceImagePort = config.input.find((port) => port.id === "referenceImageIn");
  const referenceVideoPort = config.input.find((port) => port.id === "referenceVideoIn");
  const referenceAudioPort = config.input.find((port) => port.id === "referenceAudioIn");
  const isWanFunControl = isWanFunControlModel(node.data.model);
  const isAurora = isAuroraModel(node.data.model);
  const isSam3Video = isSam3VideoModel(node.data.model);
  const settingsOpen = Boolean(node.data.settingsOpen);
  const collapsedPorts = isWanFunControl
    ? [promptPort, referenceVideoPort, referenceImagePort]
    : isAurora
      ? [promptPort, referenceImagePort, referenceAudioPort]
      : isSam3Video
        ? [promptPort, referenceVideoPort]
        : [promptPort, startFramePort, endFramePort, referenceImagePort, referenceVideoPort, referenceAudioPort];
  return (
    <div className="node-body model-node-body video-model-body">
      <ResultPane
        label="Results will appear here"
        resultUrl={node.data.resultUrl}
        resultItems={node.data.resultItems}
        selectedIndex={node.data.selectedResultIndex}
        type="video"
        status={node.data.status}
        error={node.data.error}
        onSelectResult={(index, item) => onUpdate(node.id, { selectedResultIndex: index, resultUrl: item.url })}
      />
      <button className="run-node-button" onClick={() => onRun(node)} disabled={running}>
        {running ? `Running ${formatNodeBatchCount(isSam3Video ? 1 : node.data.batchCount)}...` : "Run Video"}
      </button>
      <OutputPortRow node={node} port={outputPort} label="Video output" onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys} />
      {!settingsOpen && (
        <div className="model-input-port-stack video-model-input-port-stack" aria-label="Video model inputs">
          {collapsedPorts.filter(Boolean).map((port) => (
            <PortHandle
              key={port.id}
              node={node}
              port={port}
              side="input"
              onConnectStart={onConnectStart}
              onDisconnectInput={onDisconnectInput}
              connectedPortKeys={connectedPortKeys}
            />
          ))}
        </div>
      )}
      <details className="model-settings-drawer" open={settingsOpen} onToggle={(event) => onUpdate(node.id, { settingsOpen: event.currentTarget.open })}>
        <summary>Settings</summary>
        <NodeRow label="Model">
          <select value={node.data.model} onChange={(event) => onUpdate(node.id, { model: event.target.value })}>
            <option>{videoModelNames.seedance}</option>
            <option>{videoModelNames.seedanceFast}</option>
            <option>{videoModelNames.wanFunControl}</option>
            <option>{videoModelNames.aurora}</option>
            {sam3SegmentationModelsEnabled && <option>{videoModelNames.sam3Video}</option>}
          </select>
        </NodeRow>
        <NodeRow label="Prompt" inputPort={settingsOpen ? promptPort : null} node={node} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys}>
          <textarea className={promptConnected ? "connected-field" : ""} value={promptValue} readOnly={promptConnected} onChange={(event) => onUpdate(node.id, { prompt: event.target.value })} />
        </NodeRow>
        {!isSam3Video && (
          <NodeRow label="Generations">
            <select value={node.data.batchCount || "1"} onChange={(event) => onUpdate(node.id, { batchCount: event.target.value })}>
              {batchOptions.map((option) => (
                <option key={option} value={option}>
                  {formatNodeBatchCount(option)}
                </option>
              ))}
            </select>
          </NodeRow>
        )}
        {isWanFunControl ? (
          <>
            <NodeRow label="Control Video" inputPort={settingsOpen ? referenceVideoPort : null} node={node} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys}>
              <button className={incoming.referenceVideoIn?.length ? "connected-field" : ""}>{connectedSummary(incoming.referenceVideoIn, "Add video")}</button>
            </NodeRow>
            <NodeRow label="Reference Image" inputPort={settingsOpen ? referenceImagePort : null} node={node} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys}>
              <button className={incoming.referenceImageIn?.length ? "connected-field" : ""}>{connectedSummary(incoming.referenceImageIn, "Optional image")}</button>
            </NodeRow>
            <NodeRow label="Preprocess">
              <button className={`node-toggle ${node.data.preprocessVideo !== false ? "enabled" : ""}`} onClick={() => onUpdate(node.id, { preprocessVideo: node.data.preprocessVideo === false })}>
                <span />
              </button>
            </NodeRow>
            <NodeRow label="Type">
              <select value={node.data.preprocessType || "depth"} onChange={(event) => onUpdate(node.id, { preprocessType: event.target.value })}>
                <option value="depth">Depth</option>
                <option value="pose">Pose</option>
              </select>
            </NodeRow>
            <NodeRow label="Match Frames">
              <button className={`node-toggle ${node.data.matchInputNumFrames !== false ? "enabled" : ""}`} onClick={() => onUpdate(node.id, { matchInputNumFrames: node.data.matchInputNumFrames === false })}>
                <span />
              </button>
            </NodeRow>
            {node.data.matchInputNumFrames === false && (
              <NodeRow label="Frames">
                <input type="number" min="1" max="241" value={node.data.numFrames || 81} onChange={(event) => onUpdate(node.id, { numFrames: event.target.value })} />
              </NodeRow>
            )}
            <NodeRow label="Match FPS">
              <button className={`node-toggle ${node.data.matchInputFps !== false ? "enabled" : ""}`} onClick={() => onUpdate(node.id, { matchInputFps: node.data.matchInputFps === false })}>
                <span />
              </button>
            </NodeRow>
            {node.data.matchInputFps === false && (
              <NodeRow label="FPS">
                <input type="number" min="1" max="60" value={node.data.fps || 16} onChange={(event) => onUpdate(node.id, { fps: event.target.value })} />
              </NodeRow>
            )}
            <NodeRow label="Steps">
              <input type="number" min="1" max="60" value={node.data.numInferenceSteps || 27} onChange={(event) => onUpdate(node.id, { numInferenceSteps: event.target.value })} />
            </NodeRow>
            <NodeRow label="Guidance">
              <input type="number" min="0" max="20" step="0.1" value={node.data.guidanceScale || 6} onChange={(event) => onUpdate(node.id, { guidanceScale: event.target.value })} />
            </NodeRow>
            <NodeRow label="Shift">
              <input type="number" min="0" max="20" step="0.1" value={node.data.shift || 5} onChange={(event) => onUpdate(node.id, { shift: event.target.value })} />
            </NodeRow>
            <NodeRow label="Seed">
              <input value={node.data.seed || ""} onChange={(event) => onUpdate(node.id, { seed: event.target.value })} placeholder="Random" />
            </NodeRow>
          </>
        ) : isAurora ? (
          <>
            <NodeRow label="Image" inputPort={settingsOpen ? referenceImagePort : null} node={node} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys}>
              <button className={incoming.referenceImageIn?.length ? "connected-field" : ""}>{connectedSummary(incoming.referenceImageIn, "Add image")}</button>
            </NodeRow>
            <NodeRow label="Audio" inputPort={settingsOpen ? referenceAudioPort : null} node={node} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys}>
              <button className={incoming.referenceAudioIn?.length ? "connected-field" : ""}>{connectedSummary(incoming.referenceAudioIn, "Add audio")}</button>
            </NodeRow>
            <NodeRow label="Resolution">
              <select value={node.data.resolution} onChange={(event) => onUpdate(node.id, { resolution: event.target.value })}>
                <option>720p</option>
                <option>480p</option>
              </select>
            </NodeRow>
          </>
        ) : isSam3Video ? (
          <>
            <NodeRow label="Video" inputPort={settingsOpen ? referenceVideoPort : null} node={node} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys}>
              <button className={incoming.referenceVideoIn?.length ? "connected-field" : ""}>{connectedSummary(incoming.referenceVideoIn, "Add video")}</button>
            </NodeRow>
          </>
        ) : (
          <>
            <NodeRow label="Start Frame" inputPort={settingsOpen ? startFramePort : null} node={node} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys}>
              <button className={incoming.startFrameIn?.length ? "connected-field" : ""}>{connectedSummary(incoming.startFrameIn, "Add file")}</button>
            </NodeRow>
            <NodeRow label="End Frame" inputPort={settingsOpen ? endFramePort : null} node={node} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys}>
              <button className={incoming.endFrameIn?.length ? "connected-field" : ""}>{connectedSummary(incoming.endFrameIn, "Add file")}</button>
            </NodeRow>
            <NodeRow label="Reference Image" inputPort={settingsOpen ? referenceImagePort : null} node={node} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys}>
              <button className={incoming.referenceImageIn?.length ? "connected-field" : ""}>{connectedSummary(incoming.referenceImageIn, "Add file")}</button>
            </NodeRow>
            <NodeRow label="Reference Video" inputPort={settingsOpen ? referenceVideoPort : null} node={node} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys}>
              <button className={incoming.referenceVideoIn?.length ? "connected-field" : ""}>{connectedSummary(incoming.referenceVideoIn, "Add file")}</button>
            </NodeRow>
            <NodeRow label="Reference Audio" inputPort={settingsOpen ? referenceAudioPort : null} node={node} onConnectStart={onConnectStart} onDisconnectInput={onDisconnectInput} connectedPortKeys={connectedPortKeys}>
              <button className={incoming.referenceAudioIn?.length ? "connected-field" : ""}>{connectedSummary(incoming.referenceAudioIn, "Add file")}</button>
            </NodeRow>
            <NodeRow label="Duration">
              <select value={node.data.duration} onChange={(event) => onUpdate(node.id, { duration: event.target.value })}>
                <option>15 seconds</option>
                <option>10 seconds</option>
                <option>5 seconds</option>
              </select>
            </NodeRow>
            <NodeRow label="Resolution">
              <select value={node.data.resolution} onChange={(event) => onUpdate(node.id, { resolution: event.target.value })}>
                <option>720p</option>
                <option>480p</option>
                <option>1080p</option>
              </select>
            </NodeRow>
            <NodeRow label="Aspect Ratio">
              <select value={node.data.aspectRatio} onChange={(event) => onUpdate(node.id, { aspectRatio: event.target.value })}>
                <option>16:9 (Landscape)</option>
                <option>21:9</option>
                <option>9:16 (Portrait)</option>
                <option>1:1</option>
              </select>
            </NodeRow>
            <NodeRow label="Generate Audio">
              <button className={`node-toggle ${node.data.generateAudio ? "enabled" : ""}`} onClick={() => onUpdate(node.id, { generateAudio: !node.data.generateAudio })}>
                <span />
              </button>
            </NodeRow>
          </>
        )}
      </details>
      {isAurora && <small className="upload-status model-status-note">lipsync model</small>}
      {isSam3Video && <small className="upload-status model-status-note">segmentation model</small>}
    </div>
  );
}

function ResultPane({ label, resultUrl, resultItems = [], selectedIndex = 0, type, status, error, onSelectResult }) {
  const items = normalizedResultItems(resultItems, resultUrl, type);
  const activeIndex = Math.min(Math.max(Number(selectedIndex) || 0, 0), Math.max(items.length - 1, 0));
  const activeItem = items[activeIndex];

  function selectOffset(offset) {
    if (!items.length) return;
    const nextIndex = (activeIndex + offset + items.length) % items.length;
    onSelectResult?.(nextIndex, items[nextIndex]);
  }

  return (
    <div className={`result-pane ${items.length ? "has-result" : ""} ${items.length > 1 ? "multi-result" : ""}`}>
      {activeItem && (
        <div className="result-carousel" onPointerDown={(event) => event.stopPropagation()}>
          <div className="result-item" key={activeItem.url}>
            {activeItem.type === "image" && <img src={activeItem.url} alt={activeItem.label || `Generated image ${activeIndex + 1}`} />}
            {activeItem.type === "video" && <video src={activeItem.url} controls />}
          </div>
          {items.length > 1 && (
            <div className="result-cycle-controls" onPointerDown={(event) => event.stopPropagation()}>
              <button type="button" onClick={() => selectOffset(-1)} title="Previous generation">
                <ChevronLeft size={15} />
              </button>
              <span>{activeIndex + 1}/{items.length}</span>
              <button type="button" onClick={() => selectOffset(1)} title="Next generation">
                <ChevronRight size={15} />
              </button>
            </div>
          )}
        </div>
      )}
      {!items.length && <span>{status === "running" ? "Running..." : label}</span>}
      {error && <small>{error}</small>}
    </div>
  );
}

function NodeRow({ label, children, inputPort, node, onConnectStart, onDisconnectInput, connectedPortKeys }) {
  return (
    <div className={`node-row ${inputPort ? "has-port" : ""}`}>
      <span className="node-row-label">
        {inputPort && (
          <PortHandle
            node={node}
            port={inputPort}
            side="input"
            onConnectStart={onConnectStart}
            onDisconnectInput={onDisconnectInput}
            connectedPortKeys={connectedPortKeys}
          />
        )}
        <span>{label}</span>
      </span>
      {children}
    </div>
  );
}

function getNodeConfig(type) {
  const configs = {
    text: {
      icon: Type,
      input: [
        { id: "textIn", label: "Text", color: portColors.prompt },
        { id: "imageIn", label: "Image", color: portColors.image },
        { id: "videoIn", label: "Video", color: portColors.video },
        { id: "styleIn", label: "Style", color: portColors.style }
      ],
      output: [{ id: "promptOut", label: "Prompt", color: portColors.prompt }]
    },
    image: {
      icon: FileImage,
      input: [],
      output: [{ id: "imageOut", label: "Image", color: portColors.image }]
    },
    camera: {
      icon: Camera,
      input: [],
      output: [{ id: "cameraOut", label: "Camera", color: portColors.camera }]
    },
    style: {
      icon: Palette,
      input: [],
      output: [{ id: "styleOut", label: "Style", color: portColors.style }]
    },
    transfer: {
      icon: Compass,
      input: [],
      output: [{ id: "transferOut", label: "TRANSFER.png", color: portColors.transfer }]
    },
    video: {
      icon: Video,
      input: [],
      output: [{ id: "videoOut", label: "Video", color: portColors.video }]
    },
    audio: {
      icon: FileAudio,
      input: [],
      output: [{ id: "audioOut", label: "Audio", color: portColors.audio }]
    },
    preview: {
      icon: MonitorPlay,
      input: [{ id: "sourceIn", label: "Source", color: portColors.preview }],
      output: []
    },
    imageModel: {
      icon: ImagePlus,
      input: [
        { id: "promptIn", label: "Prompt", color: portColors.prompt },
        { id: "imagePromptIn", label: "Image Prompt", color: portColors.image },
        { id: "cameraIn", label: "Camera", color: portColors.camera },
        { id: "styleIn", label: "Style", color: portColors.style },
        { id: "transferIn", label: "Transfer", color: portColors.transfer }
      ],
      output: [{ id: "imageOut", label: "Image", color: portColors.image }]
    },
    videoModel: {
      icon: Film,
      input: [
        { id: "promptIn", label: "Prompt", color: portColors.prompt },
        { id: "startFrameIn", label: "Start Frame", color: portColors.image },
        { id: "endFrameIn", label: "End Frame", color: portColors.image },
        { id: "referenceImageIn", label: "Reference Image", color: portColors.image },
        { id: "referenceVideoIn", label: "Reference Video", color: portColors.video },
        { id: "referenceAudioIn", label: "Reference Audio", color: portColors.audio }
      ],
      output: [{ id: "videoOut", label: "Video", color: portColors.video }]
    }
  };

  return configs[type];
}

function createDefaultNodeData(type, label, count) {
  const title = `${label}${count > 1 ? ` ${count}` : ""}`;

  if (type === "text") return { title, text: "" };
  if (type === "image" || type === "video" || type === "audio") return { title };
  if (type === "preview") return { title, previewScale: 1 };
  if (type === "camera") {
    return {
      title,
      shotPreset: "None",
      lensPreset: "None",
      typePreset: "None"
    };
  }
  if (type === "transfer") {
    return {
      title,
      transferImages: [],
      activated: false,
      locked: false,
      hiddenPrompt: transferPromptSuffix
    };
  }
  if (type === "style") return { title, stylePreset: "None" };
  if (type === "imageModel") {
    return {
      title,
      model: "Nano Banana Pro",
      prompt: "",
      aspectRatio: "21:9",
      resolution: "2K",
      batchCount: "1"
    };
  }

  return {
    title,
    model: "Seedance 2.0",
    prompt: "",
    duration: "15 seconds",
    resolution: "720p",
    aspectRatio: "16:9 (Landscape)",
    generateAudio: true,
    batchCount: "1"
  };
}

function isWanFunControlModel(model) {
  return String(model || "").toLowerCase().includes("wan");
}

function isAuroraModel(model) {
  const normalized = String(model || "").toLowerCase();
  return normalized.includes("aurora") || normalized.includes("creatify");
}

function isSam3ImageModel(model) {
  if (!sam3SegmentationModelsEnabled) return false;
  const normalized = String(model || "").toLowerCase();
  return normalized.includes("sam") && normalized.includes("image");
}

function isSam3VideoModel(model) {
  if (!sam3SegmentationModelsEnabled) return false;
  const normalized = String(model || "").toLowerCase();
  return normalized.includes("sam") && normalized.includes("video");
}

function configTitleFallback(type) {
  return nodeCatalog.find((item) => item.type === type)?.label || "Node";
}

function mediaAccept(type) {
  if (type === "image") return "image/png,image/jpeg,image/webp";
  if (type === "video") return "video/mp4,video/quicktime,video/webm";
  return "audio/mpeg,audio/wav,audio/mp4";
}

function allowFileDrop(event) {
  event.preventDefault();
  event.stopPropagation();
}

function firstAcceptedFile(fileList, type) {
  const files = Array.from(fileList || []);
  if (type === "image") return files.find((file) => file.type.startsWith("image/"));
  if (type === "video") return files.find((file) => file.type.startsWith("video/"));
  if (type === "audio") return files.find((file) => file.type.startsWith("audio/"));
  return files[0];
}

function buildIncomingByNode(nodes, edges) {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  return edges.reduce((incoming, edge) => {
    const source = nodeMap.get(edge.from.nodeId);
    if (!source) return incoming;
    incoming[edge.to.nodeId] ||= {};
    incoming[edge.to.nodeId][edge.to.port] ||= [];
    incoming[edge.to.nodeId][edge.to.port].push({ edge, source });
    return incoming;
  }, {});
}

function buildConnectedPortKeys(edges) {
  const keys = new Set();
  edges.forEach((edge) => {
    keys.add(`${edge.from.nodeId}:${edge.from.port}`);
    keys.add(`${edge.to.nodeId}:${edge.to.port}`);
  });
  return keys;
}

function buildActiveEdgeIds(nodes, edges) {
  const activeNodeIds = new Set(nodes.filter((node) => node.data?.status === "running").map((node) => node.id));
  return new Set(edges.filter((edge) => activeNodeIds.has(edge.to.nodeId)).map((edge) => edge.id));
}

function buildInactiveEdgeIds(nodes, edges) {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  return new Set(
    edges
      .filter((edge) => {
        const source = nodeMap.get(edge.from.nodeId);
        return source?.type === "transfer" && (!source.data?.locked || !source.data?.activated || !source.data?.resultUrl);
      })
      .map((edge) => edge.id)
  );
}

function connectedText(items = []) {
  return items
    .map(({ source }) => {
      if (source.type === "text") return source.data.resultText || source.data.text;
      if (source.type === "imageModel" || source.type === "videoModel") return source.data.resultText;
      return source.data.title;
    })
    .filter(Boolean)
    .join("\n");
}

function connectedAssetUrls(items = []) {
  return items.map(({ source }) => source.data.resultUrl).filter(Boolean);
}

function connectedTextInputItems(items = []) {
  return items
    .map(({ source }) => ({
      label: sourceLabel(source),
      text: source.type === "text" ? source.data.resultText || source.data.text : source.data.resultText || source.data.prompt || source.data.title
    }))
    .filter((item) => item.text);
}

function connectedStyleInputItems(items = []) {
  return items
    .map(({ source }) => ({
      label: `Style: ${sourceLabel(source)}`,
      text: promptPiecesForSource(source).join("\n\n")
    }))
    .filter((item) => item.text);
}

function connectedMediaInputItems(items = [], mediaType) {
  return items
    .map(({ source }) => {
      if (!source.data.resultUrl) return null;
      return {
        url: source.data.resultUrl,
        label: sourceLabel(source),
        type: mediaType
      };
    })
    .filter(Boolean);
}

async function runTextNodeProcessing({ node, incoming, projectId, projectName }) {
  const response = await fetch("/api/node/process-text", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: node.data.text,
      textInputs: [...connectedTextInputItems(incoming.textIn), ...connectedStyleInputItems(incoming.styleIn)],
      imageInputs: connectedMediaInputItems(incoming.imageIn, "image"),
      videoInputs: connectedMediaInputItems(incoming.videoIn, "video"),
      projectId,
      projectName,
      nodeId: node.id,
      nodeTitle: node.data.title
    })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Text processing failed.");

  return {
    text: data.text || "",
    model: data.model || ""
  };
}

async function runImageModelGeneration({ node, prompt, imagePromptItems, projectId, projectName, index }) {
  const response = await fetch("/api/node/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      model: node.data.model,
      aspectRatio: node.data.aspectRatio,
      resolution: node.data.resolution,
      imagePromptUrls: imagePromptItems.map((item) => item.url),
      imagePromptLabels: imagePromptItems.map((item) => item.label),
      projectId,
      projectName,
      nodeId: node.id,
      nodeTitle: node.data.title
    })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(`Run ${index + 1}: ${data.error || "Image generation failed."}`);

  return {
    url: data.image.localUrl,
    type: "image",
    label: `Image ${index + 1}`,
    text: data.text || "",
    cost: data.cost
  };
}

async function runVideoModelGeneration({ node, prompt, incoming, projectId, projectName, index }) {
  const response = await fetch("/api/node/generate-video", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      model: node.data.model,
      duration: node.data.duration,
      resolution: node.data.resolution,
      aspectRatio: node.data.aspectRatio,
      generateAudio: node.data.generateAudio,
      startFrameUrls: connectedAssetUrls(incoming.startFrameIn),
      endFrameUrls: connectedAssetUrls(incoming.endFrameIn),
      referenceImageUrls: connectedAssetUrls(incoming.referenceImageIn),
      referenceVideoUrls: connectedAssetUrls(incoming.referenceVideoIn),
      referenceAudioUrls: connectedAssetUrls(incoming.referenceAudioIn),
      wanFunControl: {
        preprocessVideo: node.data.preprocessVideo !== false,
        preprocessType: node.data.preprocessType || "depth",
        matchInputNumFrames: node.data.matchInputNumFrames !== false,
        numFrames: node.data.numFrames || 81,
        matchInputFps: node.data.matchInputFps !== false,
        fps: node.data.fps || 16,
        numInferenceSteps: node.data.numInferenceSteps || 27,
        guidanceScale: node.data.guidanceScale || 6,
        shift: node.data.shift || 5,
        seed: node.data.seed || ""
      },
      projectId,
      projectName,
      nodeId: node.id,
      nodeTitle: node.data.title
    })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(`Run ${index + 1}: ${data.error || "Video generation failed."}`);

  return {
    url: data.video.localUrl,
    type: "video",
    label: `Video ${index + 1}`,
    seed: data.seed,
    cost: data.cost
  };
}

function normalizedResultItems(resultItems, resultUrl, type) {
  const items = Array.isArray(resultItems) ? resultItems.filter((item) => item?.url) : [];
  if (items.length) return items.map((item, index) => ({ type, label: `${type === "image" ? "Image" : "Video"} ${index + 1}`, ...item }));
  return resultUrl ? [{ url: resultUrl, type, label: type === "image" ? "Image 1" : "Video 1" }] : [];
}

function nodeBatchCount(node) {
  const count = Number(node.data.batchCount || 1);
  return Math.min(4, Math.max(1, Number.isFinite(count) ? count : 1));
}

function formatNodeBatchCount(value) {
  const count = Number(value) || 1;
  return `${count} gen${count === 1 ? "" : "s"}`;
}

function nodeBatchStatusMessage(mediaType, total, completed, failures) {
  const label = mediaType === "image" ? "image" : "video";
  const firstError = failures[0]?.reason?.message || "";
  return `${completed} of ${total} ${label} generations complete.${firstError ? ` ${firstError}` : ""}`;
}

function connectedPreviewSource(items = []) {
  const source = items.filter(({ source: item }) => item.data.resultUrl).at(-1)?.source;
  if (!source) return null;

  return {
    url: source.data.resultUrl,
    type: previewMediaType(source),
    label: sourceLabel(source)
  };
}

function previewMediaType(source) {
  if (source.type === "video" || source.type === "videoModel") return "video";
  if (/\.(mp4|mov|webm)$/i.test(source.data.resultUrl || "")) return "video";
  return "image";
}

function connectedImagePromptItems(items = []) {
  return items
    .map(({ source }) => {
      if (!source.data.resultUrl) return null;
      return {
        url: source.data.resultUrl,
        label: source.type === "transfer" ? "TRANSFER.png" : sourceLabel(source)
      };
    })
    .filter(Boolean);
}

function buildEffectiveImagePrompt(prompt, items = [], aspectRatio) {
  const hasTransferReference = items.some(({ source }) => source.type === "transfer" && source.data.resultUrl);
  const promptInstructions = items
    .flatMap(({ source }) => promptPiecesForSource(source))
    .filter(Boolean);

  if (!promptInstructions.length) return prompt;

  const ratio = extractAspectRatio(aspectRatio);
  const aspectInstruction = hasTransferReference && ratio
    ? `Generate the final image in the Image Model node's selected ${ratio} aspect ratio. Do not copy TRANSFER.png's collage layout or aspect ratio into the final image.`
    : "";

  return [prompt, ...promptInstructions, aspectInstruction].filter(Boolean).join("\n\n");
}

function promptPiecesForSource(source) {
  if (source.type === "camera") {
    return cameraPromptPieces(source);
  }

  if (source.type === "style") {
    const selectedPreset = source.data.stylePreset || "None";
    return [stylePresetPrompts[selectedPreset] || ""].filter(Boolean);
  }

  if (source.type !== "transfer" || !source.data.activated || !source.data.resultUrl) return [];

  return [source.data.hiddenPrompt || transferPromptSuffix].filter(Boolean);
}

function cameraPromptPieces(source) {
  const selectedShot = source.data.shotPreset || "None";
  const selectedLens = source.data.lensPreset || "None";
  const selectedType = source.data.typePreset || "None";

  return [
    shotPresetPrompts[selectedShot] || "",
    lensPresetPrompts[selectedLens] || "",
    typePresetPrompts[selectedType] || ""
  ].filter(Boolean);
}

function hasCameraPreset(source) {
  return cameraPromptPieces(source).length > 0;
}

function cameraLabel(source) {
  const labels = [source.data.shotPreset, source.data.lensPreset, source.data.typePreset].filter((value) => value && value !== "None");
  return labels.length ? labels.join(" + ") : "Camera";
}

function connectedSummary(items = [], fallback) {
  if (!items.length) return fallback;
  if (items.length === 1) return sourceLabel(items[0].source);
  return `${items.length} connected`;
}

function sourceLabel(source) {
  if (source.type === "camera") return cameraLabel(source);
  if (source.type === "transfer" && source.data.resultUrl) return "TRANSFER.png";
  if (source.type === "style") return (source.data.stylePreset || "None") === "None" ? "Style" : source.data.stylePreset;
  if (source.data.resultUrl) return source.data.resultUrl.split("/").pop();
  if (source.data.fileName) return source.data.fileName;
  return source.data.title || source.type;
}

function extractAspectRatio(value) {
  return String(value || "").match(/\d+:\d+/)?.[0] || "";
}

async function createTransferCollageBlob(images) {
  const loadedImages = await Promise.all(images.map((image) => loadCanvasImage(image.localUrl)));
  const columns = loadedImages.length === 1 ? 1 : loadedImages.length <= 4 ? 2 : 3;
  const rows = Math.ceil(loadedImages.length / columns);
  const cellSize = 512;
  const gap = 18;
  const canvas = document.createElement("canvas");
  canvas.width = columns * cellSize;
  canvas.height = rows * cellSize;

  const context = canvas.getContext("2d");
  context.fillStyle = "#0d0d0d";
  context.fillRect(0, 0, canvas.width, canvas.height);

  loadedImages.forEach((image, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const x = column * cellSize + gap / 2;
    const y = row * cellSize + gap / 2;
    const size = cellSize - gap;
    drawImageCover(context, image, x, y, size, size);
    context.strokeStyle = "rgba(255, 255, 255, 0.16)";
    context.lineWidth = 2;
    context.strokeRect(x, y, size, size);
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Could not create TRANSFER.png."));
      }
    }, "image/png");
  });
}

function loadCanvasImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not load one of the transfer images."));
    image.src = src;
  });
}

function drawImageCover(context, image, x, y, width, height) {
  const sourceRatio = image.naturalWidth / image.naturalHeight;
  const targetRatio = width / height;
  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (sourceRatio > targetRatio) {
    sourceWidth = image.naturalHeight * targetRatio;
    sourceX = (image.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = image.naturalWidth / targetRatio;
    sourceY = (image.naturalHeight - sourceHeight) / 2;
  }

  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

function normalizeRect(start, current) {
  return {
    left: Math.min(start.x, current.x),
    top: Math.min(start.y, current.y),
    right: Math.max(start.x, current.x),
    bottom: Math.max(start.y, current.y)
  };
}

function rectsIntersect(first, second) {
  return first.left <= second.right && first.right >= second.left && first.top <= second.bottom && first.bottom >= second.top;
}

function pointInRect(rect, point) {
  return point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom;
}

function groupToRect(group) {
  return {
    left: group.x,
    top: group.y,
    right: group.x + group.width,
    bottom: group.y + group.height
  };
}

function sameStringList(first = [], second = []) {
  if (first.length !== second.length) return false;
  return first.every((value, index) => value === second[index]);
}

function finiteNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function isRunnableNode(node) {
  return ["text", "imageModel", "videoModel"].includes(node.type);
}

function buildSelectedRunnableDependencies(nodes, edges) {
  const runnableIds = new Set(nodes.map((node) => node.id));
  const dependencies = new Map(nodes.map((node) => [node.id, []]));

  edges.forEach((edge) => {
    if (!runnableIds.has(edge.from.nodeId) || !runnableIds.has(edge.to.nodeId)) return;
    dependencies.get(edge.to.nodeId)?.push(edge.from.nodeId);
  });

  return dependencies;
}

function nodeRunPriority(node) {
  if (node?.type === "text") return 0;
  if (node?.type === "imageModel") return 1;
  if (node?.type === "videoModel") return 2;
  return 3;
}

function runStageLabel(type) {
  if (type === "text") return "text";
  if (type === "imageModel") return "image";
  if (type === "videoModel") return "video";
  return "selected";
}

function nodeTitle(node) {
  return node?.data?.title || node?.type || "a dependency";
}

async function settleSequential(items, run, delayMs = 0) {
  const results = [];

  for (const [index, item] of items.entries()) {
    if (index > 0 && delayMs > 0) await wait(delayMs);

    try {
      results.push({ status: "fulfilled", value: await run(item, index) });
    } catch (reason) {
      results.push({ status: "rejected", reason });
    }
  }

  return results;
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function cloneGraphState(state) {
  return {
    nodes: state.nodes.map(cloneNode),
    edges: state.edges.map(cloneEdge),
    groups: (state.groups || []).map(cloneGroup),
    viewport: { ...state.viewport },
    selectedNodeIds: [...state.selectedNodeIds],
    selectedEdgeId: state.selectedEdgeId || null
  };
}

function cloneNode(node) {
  return {
    ...node,
    data: JSON.parse(JSON.stringify(node.data || {}))
  };
}

function cloneEdge(edge) {
  return {
    ...edge,
    from: { ...edge.from },
    to: { ...edge.to }
  };
}

function cloneGroup(group) {
  return {
    ...group,
    nodeIds: [...(group.nodeIds || [])]
  };
}

function loadNodeEditorDraft() {
  const fallbackGraph = normalizeEditorGraph(initialNodes, initialEdges);
  const fallback = {
    nodes: fallbackGraph.nodes,
    edges: fallbackGraph.edges,
    groups: fallbackGraph.groups,
    viewport: { x: 0, y: 0, scale: 1 },
    projectId: null,
    projectName: "Untitled node project",
    savedProjectName: null
  };

  try {
    const parsed = JSON.parse(localStorage.getItem(nodeDraftStorageKey) || "null");
    if (!parsed || !Array.isArray(parsed.nodes) || !Array.isArray(parsed.edges)) return fallback;
    const graph = normalizeEditorGraph(parsed.nodes, parsed.edges, parsed.groups);
    return {
      nodes: graph.nodes,
      edges: graph.edges,
      groups: graph.groups,
      viewport: parsed.viewport || fallback.viewport,
      projectId: parsed.projectId || null,
      projectName: parsed.projectName || fallback.projectName,
      savedProjectName: parsed.savedProjectName || null
    };
  } catch {
    return fallback;
  }
}

function normalizeEditorGraph(nodes = [], edges = [], groups = []) {
  const normalizedNodes = [];
  const legacySplits = new Map();

  nodes.forEach((node) => {
    if (isLegacyDirectionNode(node)) {
      const split = splitLegacyDirectionNode(node);
      normalizedNodes.push(split.transferNode);
      if (split.cameraNode) normalizedNodes.push(split.cameraNode);
      if (split.styleNode) normalizedNodes.push(split.styleNode);
      legacySplits.set(node.id, split);
      return;
    }

    normalizedNodes.push(clearStaleRunningState(node));
  });

  const nodeMap = new Map(normalizedNodes.map((node) => [node.id, node]));
  const normalizedEdges = [];

  edges.forEach((edge) => {
    const split = legacySplits.get(edge.from.nodeId);
    if (split) {
      normalizedEdges.push(...edgesForLegacyDirection(edge, split));
      return;
    }

    const normalizedEdge = normalizeEdgeForCurrentGraph(edge, nodeMap);
    if (normalizedEdge) normalizedEdges.push(normalizedEdge);
  });

  return {
    nodes: normalizedNodes,
    edges: dedupeEdges(normalizedEdges),
    groups: normalizeGroups(groups, nodeMap)
  };
}

function normalizeGroups(groups = [], nodeMap = new Map()) {
  if (!Array.isArray(groups)) return [];

  return groups
    .map((group, index) => {
      const nodeIds = [...new Set(Array.isArray(group?.nodeIds) ? group.nodeIds.filter((id) => nodeMap.has(id)) : [])];
      return {
        id: String(group?.id || `group-${index + 1}`),
        name: String(group?.name || `Group ${index + 1}`),
        color: groupPalette.includes(group?.color) ? group.color : groupPalette[index % groupPalette.length],
        x: finiteNumber(group?.x, 120 + index * 30),
        y: finiteNumber(group?.y, 120 + index * 30),
        width: Math.max(groupMinWidth, finiteNumber(group?.width, groupMinWidth)),
        height: Math.max(groupMinHeight, finiteNumber(group?.height, groupMinHeight)),
        nodeIds
      };
    })
    .filter((group) => group.id && group.width && group.height);
}

function isLegacyDirectionNode(node) {
  return node.type === "direction" || (node.type === "style" && hasLegacyDirectionData(node));
}

function hasLegacyDirectionData(node) {
  const data = node.data || {};
  return Array.isArray(data.styleImages) || "activated" in data || "locked" in data || "hiddenPrompt" in data || "shotPreset" in data || "lensPreset" in data || "typePreset" in data;
}

function splitLegacyDirectionNode(node) {
  const data = node.data || {};
  const transferNode = clearStaleRunningState({
    ...node,
    type: "transfer",
    data: {
      ...data,
      title: transferTitleFromLegacy(data.title),
      transferImages: data.transferImages || data.styleImages || [],
      hiddenPrompt: transferPromptSuffix
    }
  });

  const cameraNode = hasCameraPreset({ data })
    ? {
        id: `${node.id}-camera`,
        type: "camera",
        x: node.x + 360,
        y: node.y,
        data: {
          title: "Camera",
          shotPreset: data.shotPreset || "None",
          lensPreset: data.lensPreset || "None",
          typePreset: data.typePreset || "None"
        }
      }
    : null;

  const styleNode =
    data.stylePreset && data.stylePreset !== "None"
      ? {
          id: `${node.id}-style`,
          type: "style",
          x: node.x + 360,
          y: node.y + 118,
          data: {
            title: "Style",
            stylePreset: data.stylePreset
          }
        }
      : null;

  return {
    originalId: node.id,
    transferNode,
    cameraNode,
    styleNode
  };
}

function edgesForLegacyDirection(edge, split) {
  const edges = [];

  if (edge.to.port === "imagePromptIn") {
    edges.push({
      ...cloneEdge(edge),
      id: `${edge.id}-transfer`,
      from: { nodeId: split.transferNode.id, port: "transferOut" },
      to: { ...edge.to, port: "transferIn" },
      color: portColors.transfer
    });

    if (split.cameraNode) {
      edges.push({
        id: `${edge.id}-camera`,
        from: { nodeId: split.cameraNode.id, port: "cameraOut" },
        to: { ...edge.to, port: "cameraIn" },
        color: portColors.camera
      });
    }

    if (split.styleNode) {
      edges.push({
        id: `${edge.id}-style`,
        from: { nodeId: split.styleNode.id, port: "styleOut" },
        to: { ...edge.to, port: "styleIn" },
        color: portColors.style
      });
    }
  }

  if (edge.to.port === "sourceIn") {
    edges.push({
      ...cloneEdge(edge),
      id: `${edge.id}-transfer`,
      from: { nodeId: split.transferNode.id, port: "transferOut" },
      color: portColors.transfer
    });
  }

  return edges;
}

function normalizeEdgeForCurrentGraph(edge, nodeMap) {
  const source = nodeMap.get(edge.from.nodeId);
  if (!source) return null;

  const nextEdge = cloneEdge(edge);

  if (source.type === "transfer") {
    nextEdge.from.port = "transferOut";
    if (nextEdge.to.port === "imagePromptIn") nextEdge.to.port = "transferIn";
    nextEdge.color = portColors.transfer;
  }

  if (source.type === "camera") {
    nextEdge.from.port = "cameraOut";
    nextEdge.color = portColors.camera;
  }

  if (source.type === "style") {
    nextEdge.from.port = "styleOut";
    nextEdge.color = portColors.style;
  }

  return nextEdge;
}

function dedupeEdges(edges) {
  const seen = new Set();
  return edges.filter((edge) => {
    const key = `${edge.from.nodeId}:${edge.from.port}->${edge.to.nodeId}:${edge.to.port}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function clearStaleRunningState(node) {
  if (node.data?.status !== "running") return node;

  return {
    ...node,
    data: {
      ...node.data,
      status: node.data.resultUrl ? "complete" : "ready"
    }
  };
}

function transferTitleFromLegacy(title) {
  if (!title) return "Transfer";
  return String(title).replace(/^(Style|Direction)\b/, "Transfer");
}

function roundPreviewScale(value) {
  return Math.round(value * 100) / 100;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clampContextMenuPosition(x, y, rect) {
  const maxX = Math.max(contextMenuSize.inset, rect.width - contextMenuSize.width - contextMenuSize.inset);
  const maxY = Math.max(contextMenuSize.inset, rect.height - contextMenuSize.height - contextMenuSize.inset);

  return {
    x: clamp(x, contextMenuSize.inset, maxX),
    y: clamp(y, contextMenuSize.inset, maxY)
  };
}

function positiveModulo(value, divisor) {
  if (!divisor) return 0;
  return ((value % divisor) + divisor) % divisor;
}
