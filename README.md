# CADViewer React Application

This project is a React web application integrated with the **CADViewer Conversion Server**. It provides a modern interface to load, browse, and interact with CAD files (DWG, DGN, PDF, SVG, etc.) dynamically using the CADViewer JS API.

## 🚀 Technologies Used

- **Framework:** [React](https://reactjs.org/)
- **Build Tool:** [Create React App](https://github.com/facebook/create-react-app)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **CAD Engine:** [CADViewer API](https://cadviewer.com/) & AutoXchange Conversion Server

## ✨ Features Implemented

* **Integrated CADViewer Canvas:** Deep integration with CADViewer JS library to dynamically display engineered CAD drawings within the React component tree.
* **Backend Connection:** Connected to the `cadviewer-conversion-server-nextgen` backend to list drawing directories and invoke CAD conversions.
* **Visual Query Layout:** Flexible UI panels (SplitPanes/Slide-Outs) to display folder structures and space object information.
* **AutoXchange Conversion Pipeline:** Securely fetches files locally, parses relative URLs into absolute server queries, and renders the resulting data in CADViewer.

## 🛠️ Project Setup & Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed, and the corresponding CADViewer conversion server running locally on `http://localhost:3000`.

### Install Dependencies
```bash
npm install
```

### Development Server
Run the project locally. Open [http://localhost:3001](http://localhost:3001) to view it in your browser.
```bash
npm start
```

### Build for Production
Compiles and minifies the React app into static assets in the `build` folder.
```bash
npm run build
```

## 🔧 CADViewer Configuration

The `src/utils/config.ts` (and its environment-specific overlays in `src/demos/`) acts as the central brain for the frontend application. It is a **dynamic, evolving wrapper** that houses all the settings, feature flags, and API configurations necessary to securely initialize and control CADViewer. 

This configuration dictates everything from UI toggles (e.g., displaying top menus) to backend routing for file conversions. As the application evolves, this document will change dynamically to support new workflows.

To configure the application against your own server instance, verify the endpoint mappings inside `src/utils/config.ts`:

```typescript
ServerBackEndUrl: "http://localhost:3000",   // Target for CADViewer backend API and conversion server
ServerUrl: "http://localhost:3001",          // Frontend server (Optional local override)
ServerLocation: "",                          // Physical location override (typically blank for AutoXchange)
```

**Note:** CAD files loaded from the `FolderStructure` will automatically sanitize relative folder queries and prepend the `ServerBackEndUrl` for absolute remote loading into the AutoXchange pipeline.

## Documentation & Guides

For a deep dive into the available configuration parameters, API calls, and workflows, please reference the official CADViewer developer documentation:

* Use the **[CADViewer API](https://cadviewer.com/cadviewerproapi/global.html)** to open and manipulate drawings in your application.
* Read the Guide on how to **[create hotspots](https://cadviewer.com/highlight/main/)** (Space Objects). It outlines how spaces can be processed on a drawing to create interactive objects.
* Read the Guide on how to **[modify hotspots](https://cadviewer.com/highlight2/main/)** (Space Objects). This will help you work with the visual query code in this sample.
* The general documentation on **CADViewer** is found at: [https://cadviewer.com/cadviewertechdocs/](https://cadviewer.com/cadviewertechdocs/).
* The general documentation on **AutoXchange** is found at: [https://cadviewer.com/autoxchangetechdocs/](https://cadviewer.com/autoxchangetechdocs/).

## License

**TMS 1.0**: Use freely on localhost. Commercial use requires licensing, both using entirely or in parts. Forbidden to remove license key check. Contact Tailor Made Software, [https://cadviewer.com/contact](https://cadviewer.com/contact), for more information.

---

*Part of the CADViewer integration suite.*
