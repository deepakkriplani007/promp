"use client";
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="='mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedResult, setSearchedResult] = useState([]);
  const [post, setPost] = useState([]);
  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return post.filter((item) => {
      return (
        regex.test(item.creator.username) ||
        regex.test(item.creator.email) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
      );
    });
  };
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
    const searchResult = filterPrompts(searchText);
    setSearchedResult(searchResult);
  };
  const handleTagClick = (tagName) => {
    // console.log(tagName);
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResult(searchResult);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPost(data);
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-cener">
        <input
          type="text "
          placeholder="search for a tag or a username "
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {!searchText ? (
        <PromptCardList data={post} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={searchedResult} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
