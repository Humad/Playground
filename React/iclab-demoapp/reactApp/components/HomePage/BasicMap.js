import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps";

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

const defaultGeographyStyle = {
    default: {
      fill: "#ECEFF1",
      stroke: "#607D8B",
      strokeWidth: 0.75,
      outline: "none",
    },
    hover: {
      fill: "#607D8B",
      stroke: "#607D8B",
      strokeWidth: 0.75,
      outline: "none",
    },
    pressed: {
      fill: "#FF5722",
      stroke: "#607D8B",
      strokeWidth: 0.75,
      outline: "none",
    }
}


// Style for country that exists in our db
const foundGeographyStyle = {
  default: {
    fill: "#0000FF",
    stroke: "#607D8B",
    strokeWidth: 0.75,
    outline: "none",
  },
  hover: {
    fill: "#607D8B",
    stroke: "#607D8B",
    strokeWidth: 0.75,
    outline: "none",
  },
  pressed: {
    fill: "#FF5722",
    stroke: "#607D8B",
    strokeWidth: 0.75,
    outline: "none",
  }
}

// TO-DO: Map 2-letter country codes to 3-letter ones, or vice versa

class BasicMap extends Component {
  render() {
    return (
      <div style={wrapperStyles}>
      <h3>Click on a country below to see experiment results</h3>
      <h4>For the purposes of this demo, only the United States and the Netherlands are supported.</h4>
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11,0,0],
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup center={[0,20]} disablePanning>
            <Geographies geography="./static/world-50m.json">
              {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                <Link key={i} to={`/${geography.id.substring(0, 2)}`}>
                  <Geography
                    geography={geography}
                    projection={projection}
                    style={this.props.countries.some((item) => item.countryCode === geography.id.substring(0, 2)) ? foundGeographyStyle : defaultGeographyStyle}
                  />
                </Link>
              ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    );
  }
}

export default BasicMap;