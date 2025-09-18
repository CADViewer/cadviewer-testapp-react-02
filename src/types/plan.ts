export interface PlanDetail {
	"planName": string;
	"planDisplayName": string;
	"floorName": string;
	"svgFileName": string;
	"dataFileName": string;
	"planType": string;
}

export interface PlanType {
	displayOrder: number;
	planType: string;
	properties: Plan[];
}

export interface SearchPlanType {
	displayOrder: number;
	planType: string;
	plans: SearchPlan[];
}

export interface SearchPlan {
	dataFileName: string;
	planDisplayName: string;
	planName: string;
	propertyName: string;
	propertyNumber: string;
	spaces: Space[];
}

export interface Space {
	spaceHeader: string;
	spaceNumber: string;
}

export interface Plan {
	"propertyNumber": string;
	"propertyName": string;
	"plans": PlanDetail[];
}

export interface DetailTab {
	caption: string;
	detail: TenantInfo;
}

export interface SpaceInfo {
	spaceNumber: string;
	spaceHeader: string;
	summary: {
		[key:string]: string;
	};
	detailTabs: DetailTab[];
}

export interface PlanInfo {
	"planType": string;
	"propertyName": string;
	"propertyNumber": string;
	"planName": string;
	"spaces": SpaceInfo[];
}

export interface TenantInfo {
	"Mall Name": string;
	"Property #": string;
	"DBA": string;
	"Space #": string;
	"GLA": number;
	"Actual Footprint SF": number;
	"Base Rent (annual)": number;
	"Base Rent PSF": number;
	"Gross Rent": number;
	"Gross Rent PSF": number;
	"Sales R12": number;
	"Sales R12 PSF": number;
	"Occupancy Cost": number;
	"Occupancy Cost PSF": number;
	"Deal Type": string;
	"Lease ID": string;
	"Lease Type": string;
	"Lease Status": string;
	"Deal ID": string;
	"Deal Stage": string;
	"Deal Record Type": string;
	"Lease Start Date": string;
	"Lease End Date": string;
	"Rent Expiration Date": string;
	"ABF RCD": string;
	"Date of Possession (Mutually Agreed)": string;
	"Date of Possession (Projected Per TC)": string;
	"Date of Possession (Actual)": string;
	"Store Opening (Projected Per TC)": string;
	"Store Opening (Actual) Date": string;
	"Executed Date": string;
	"High Priority Tenant": string;
	"Kickout Y\/N (within 24 months)": string;
	"Merchandise Category": string;
	"SF of the Deal": string,
	"Total Rent": string,
	"Total Rent PSF": string,
	"Projected R12 Sales": string,
	"Projected R12 Sales PSF": string,
	"Occupancy Cost %": string,
	"Deal Name": string,
	"Deal Sub-Stage": string,
	"Projected Rent Commencement Date": string,
	"Term (Months)": string,
	"Deal Rent Type": string,
	"Total Capital": string,
	"Breakpoint Amount": string,
	"% to Pay": string
}