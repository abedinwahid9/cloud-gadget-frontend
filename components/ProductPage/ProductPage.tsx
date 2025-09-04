import React from "react";
import ProductCarosul from "../share/ProductCarosul/ProductCarosul";
import ProductDetails from "../ProductDetails/ProductDetails";
import SpecificationSection from "../share/SpecificationSection/SpecificationSection";

const ProductPage = () => {
  const quillOutput = `
  <h2>Product Overview</h2>
  <p>
    The <strong>JBL Tune Flex 2 Ghost Edition</strong> earbuds deliver powerful bass, 
    advanced noise cancellation, and a sleek transparent design. 
    With up to <em>48 hours of playback</em>, they are built for all-day use.
  </p>

  <h3>Key Features</h3>
  <ul>
    <li>12mm Dynamic Drivers for crystal clear sound</li>
    <li>Adaptive Noise Cancelling & Ambient Aware</li>
    <li>Up to 48 Hours of Battery Life</li>
    <li>IP54 Rating for dust and water resistance</li>
    <li>6 microphones for calls with perfect clarity</li>
  </ul>

  <h3>Technical Specifications</h3>
  <table style="width:100%; border-collapse: collapse;" border="1">
    <tr>
      <th style="padding:8px; text-align:left;">Specification</th>
      <th style="padding:8px; text-align:left;">Details</th>
    </tr>
    <tr>
      <td style="padding:8px;">Driver Size</td>
      <td style="padding:8px;">12mm / 0.47” Dynamic Driver</td>
    </tr>
    <tr>
      <td style="padding:8px;">Battery Life</td>
      <td style="padding:8px;">Up to 48 Hours (with case)</td>
    </tr>
    <tr>
      <td style="padding:8px;">Charging Port</td>
      <td style="padding:8px;">USB Type-C, Fast Charging</td>
    </tr>
    <tr>
      <td style="padding:8px;">Water Resistance</td>
      <td style="padding:8px;">IP54</td>
    </tr>
  </table>

  <h3>In the Box</h3>
  <ol>
    <li>JBL Tune Flex 2 Earbuds</li>
    <li>Charging Case</li>
    <li>USB Type-C Cable</li>
    <li>User Manual & Warranty Card</li>
  </ol>

  <h3>Product Images</h3>
  <p>
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAclBMVEX///8AAADd3d3q6uqnp6f7+/v19fXp6emUlJS+vr7g4OCZmZnd3d2AgICwsLDKysqDg4PX19dOTk7IyMi7u7t3d3e1tbWh4eHa2trT09OQkJDf399mZmaRkZFTU1ORkZHt7e1VVVXm5uZoaGg8PDwzMzP6kAMPAAABFUlEQVR4nO3d7XLCMBRAUViIqGJgggKCwP7/X6ZrHk3jC4oTu03t4PTtvrOnzFTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8j2sCkPU7WKmHpS/J/NHtSzJvgbyEyGIfIhPfbTPH7rR+YUkJpEP/8ZQU6eHfrxj7cCRgV2VXtdEJW0T6vZeSYcp0N6iqPtyFr5aTrarRpuSuOjgrjLQoa3jPfiI1gLrdI9YlHEGfn2zMvwlpPzGnHcBTTeUKKxx1XhrwlLFHbH66FszcW+jL3ymxhW3qL2s9X3ve4cvnFSrypLRz8Ue8gkHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAP8AdwY2MiWngm+oAAAAASUVORK5CYII=" 
         alt="Earbuds Front" style="max-width:250px; margin-right:10px;"/>
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAjVBMVEX///8AAADd3d3p6emUlJT7+/v19fXq6uqnp6fd3d2ZmZmd3d3g4ODX19fKysqAgIC+vr7IyMjd3d27u7u1tbWQkJDf399OTk7m5uZ3d3eRkZFTU1OwsLDt7e1VVVXm5uZoaGg8PDx3d3e1tbWh4eGVlZWYmJiiom4bAAAAvUlEQVR4nO3dSxKCQBAFUKtwCrGwihDg/v9/nkYbE2oFiaWZnHt/P4kOdXU7ctokAAAAAAAAAAAAAAAAAAAAAAD4s5YY4G1UmdSxfmW3v6Flf9Wr3hkp33aq/k+KXRgLm/oGrf0VXrWdp6j20+xvtxqtGeYjAmd3hVFnbeG5X/SuMWeUtzP3k2jKGrhv5btSnbiqPM/ZRZ7qmmrGZ9d5Qz+fX1F+58vP3xI1zHJ55na0Zjz/HKcXdR3MuP8CAdfROcXMSzsAAAAASUVORK5CYII=" 
         alt="Earbuds Side" style="max-width:250px;"/>
  </p>

  <h3>Warranty Information</h3>
  <p>
    Backed by a <strong>6 months brand warranty</strong> that covers manufacturing defects. 
    Physical or water damage is not covered.
  </p>
`;

  return (
    <>
      <div className="flex justify-between lg:flex-row flex-col items-center gap-5 py-4">
        <ProductCarosul />
        <ProductDetails />
      </div>
      <div className="pb-5">
        <SpecificationSection title="Specifications" content={quillOutput} />
      </div>
    </>
  );
};

export default ProductPage;
