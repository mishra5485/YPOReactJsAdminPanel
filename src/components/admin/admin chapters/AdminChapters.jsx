import axios from "axios";
import { chapters } from "../../services/api";
import React, { useEffect, useState } from "react";
import AdminChapterTable from "./AdminChapterTable";

const AdminChapters = () => {
  const [chapterData, setChapterData] = useState([]);

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    const response = await axios.post(`${chapters.GET_ALL}`);
    // console.log(response.data.data.ChapterData);
    setChapterData(response.data.data.ChapterData);
  };

  return (
    <div>
      <AdminChapterTable />
    </div>
  );
};

export default AdminChapters;
