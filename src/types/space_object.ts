export interface SpaceObjectProps {
	
    path:                string;
    node:                string;
    area:                string;
    occupancy:           string;
    name:                string;
    type:                string;
    id:                  string;
    layer:               string;
	clickhandler: 	     string;
    attributes:          Attribute[];
    attributeStatus:     string;
}

export interface Attribute {
    name:  string;
    value: string;
}