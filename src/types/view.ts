export interface ViewsPlanType {
  displayOrder: number;
  planType: string;
  selected: string;
  views: View[];
}

export interface View {
  view: string;
  View: string;
  selected: boolean;
  displayOrder: number;
  initialLayerState: string;
  layers: Layer[];
}

export interface Layer {
  layer: string;
  layerState: string;
  colorOverride: string;
}