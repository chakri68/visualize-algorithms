import FabricCanvas from "../components/FabricCanvas";
import Navbar from "../components/Navbar";

export default function Visualize() {
  return (
    <>
      <Navbar activeTab="Editor" />
      <FabricCanvas />
    </>
  );
}
