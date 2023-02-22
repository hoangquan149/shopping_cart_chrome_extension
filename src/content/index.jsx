import React from "react"
import { createRoot } from "react-dom/client"
import FooterShopping from "./FooterShopping"
const footer = document.createElement('div')
document.body.append(footer);

const root = createRoot(footer)

root.render(
    <React.StrictMode>
        <FooterShopping />
    </React.StrictMode>
)

export { }
