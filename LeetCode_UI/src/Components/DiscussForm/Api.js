import axios from "axios";
import { BASE_URL } from "../../config";

const token = localStorage.getItem("userToken");

const getUserDetails = async () => {
  try {
    if (!token) {
      console.error("User token is not available");
      return;
    }

    const res = await axios.get(`${BASE_URL}/account/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getComments = async () => {
  // Get the current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();

  return [
    {
      id: "1",
      body: "First comment",
      username: "Jack",
      userId: "1",
      parentId: null,
      createdAt: formattedDate,
    },
    {
      id: "2",
      body: "Second comment",
      username: "John",
      userId: "2",
      parentId: null,
      createdAt: formattedDate,
    },
    {
      id: "3",
      body: "First comment first child",
      username: "John",
      userId: "2",
      parentId: "1",
      createdAt: formattedDate,
    },
    {
      id: "4",
      body: "Second comment second child",
      username: "John",
      userId: "2",
      parentId: "2",
      createdAt: formattedDate,
    },
  ];
};

export const createComment = async (text, parentId = null) => {
  let res = await getUserDetails();
  if (!res) {
    return;
  }

  if (!token) {
    console.error("User token is not available");
    return;
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/comment/addComment`,
      {
        id: Math.random().toString(36).substr(2, 9),
        body: text,
        parentId: parentId,
        userId: res.data?.user?._id,
        userName: res.data?.user?.name,
        createdDate: new Date().toISOString(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Comment added:", response.data);
  } catch (error) {
    console.error("Error adding comment:", error.message);
  }
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
