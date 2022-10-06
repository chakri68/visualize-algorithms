import { useEffect, useRef, useState } from "react";
import { Button, Segment, Header, Modal, Icon } from "semantic-ui-react";
import { fabric } from "fabric";
import { getViewport } from "../public/scripts/Helper";

var fabricCanvas = new fabric.Canvas();

export default function FabricCanvas() {
  let [activeElement, setActiveElement] = useState(undefined);
  let algoData = {
    functions: [],
    randomArrays: [],
  };

  function getProperties() {
    console.log(fabricCanvas.getActiveObject());
  }

  let canvas = useRef();

  let [open, setOpen] = useState(false);

  function clearCanvas() {
    fabricCanvas.clear();
  }
  function onObjectDeselected(e) {
    setActiveElement(undefined);
  }
  function onObjectSelected(e) {
    setActiveElement(e.selected);
  }
  function addRect() {
    // create a rectangle object
    let rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 20,
      height: 20,
      angle: 45,
    });

    // "add" rectangle onto canvas
    fabricCanvas.add(rect);
    algoData.functions.push(rect);
    console.log(algoData);
  }
  useEffect(() => {
    let viewport = getViewport();
    // create a wrapper around native canvas element (with id="c")
    fabricCanvas.initialize(canvas.current, {
      height: viewport[1] - 175,
      width: viewport[0] - 50,
    });
    // Add event listeners
    fabricCanvas.on("selection:created", onObjectSelected);
    fabricCanvas.on("before:selection:cleared", onObjectDeselected);
  }, []);
  return (
    <>
      <Button onClick={addRect}>Add Rectangle</Button>
      <Modal
        // basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="tiny"
        trigger={<Button>Clear Canvas</Button>}
      >
        <Header icon="remove" content="Clear the canvas" />
        <Modal.Content>
          <p>Are you sure you want to clear the canvas?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" inverted onClick={() => setOpen(false)}>
            <Icon name="remove" /> No
          </Button>
          <Button
            color="green"
            inverted
            onClick={() => {
              setOpen(false);
              clearCanvas();
            }}
          >
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
      <Button onClick={getProperties} disabled={activeElement == undefined}>
        Properties
      </Button>
      <Segment>
        <canvas ref={canvas} id="f-canvas"></canvas>
      </Segment>
    </>
  );
}
