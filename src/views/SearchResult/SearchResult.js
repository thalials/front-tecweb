import React, { useEffect, useState, useLayoutEffect } from 'react';
import "./styles.css";
import Header from "../../Components/Header";
import ResultCard from "./Components/ResultCard";

function SearchResult(props) {
  const _id = props.match.params.city_id;

  return (
    <div>
      <Header />
      <section className="search-result-main">
        <ResultCard id={_id} />
      </section>
    </div>
  );
}

export default SearchResult;
