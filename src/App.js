import { useState, useEffect } from "react";
import "./styles.css";
import { fetchDataFromApi } from "./api/api";
import FileBox from "./components/FileBox/FileBox";
import PageHeader from "./components/PageHeader/PageHeader";
import PageTitle from "./components/PageTitle/PageTitle";
import Advertisement from "./resources/advertisement.svg";
import Information from "./resources/info.svg";
import FAQ from "./resources/faq.svg";
import PageFooter from "./resources/footer.svg";

const TitleInfo = {
  title: "Compress PDF",
  subtitle: "PDF compressor to reduce the size of PDF files quickly and easily",
};

export default function App() {
  return (
    <div className="App">
      <PageHeader />
      <PageTitle title={TitleInfo.title} subtitle={TitleInfo.subtitle} />
      <FileBox />
      {/* TODO: Replace with interactive components */}
      <img src={Advertisement} alt="Advertisement" className="advertisement" />
      <img src={Information} alt="Information" className="information" />
      <img src={FAQ} alt="FAQ" className="faq" />
      <img src={PageFooter} alt="Footer" className="footer" />
      {/* END TODO */}
    </div>
  );
}
