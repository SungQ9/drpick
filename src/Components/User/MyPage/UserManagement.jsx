import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTokenContext } from "../../Context/TokenContext";
import { useModalContext } from "../../Context/ModalContext";
import UpdateListContext from "../../Context/UpdateListContext";
import axios from "axios";
import headers from "../../SampleData/Headers";
import List from "../../Layout/List";
import ListTitle from "../../Layout/List/ListTitle";
import Loading from "../../User/ImageSearch/Loading";
import useAlert from "../../Layout/Alert";

const UserManagement = () => {
  const location = useLocation();
  const { token, userAuth, userEmail, userId } = useTokenContext();
  const selectedType = location.state?.selectedType || "default";
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState([]);
  const [currentHeaders, setCurrentHeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isModalOpen } = useModalContext();
  const [selectedReviews, setSelectedReviews] = useState([]);
  const { Alert } = useAlert();

  const handleSearch = (key) => {
    setKeyword(key);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      userEmail: userEmail,
      userAuth: userAuth,
      memberId: userId,
    },
  };

  const handleReviewSelect = (reviewId) => {
    setSelectedReviews((prevSelected) => {
      if (prevSelected.includes(reviewId)) {
        return prevSelected.filter((id) => id !== reviewId);
      } else {
        return [...prevSelected, reviewId];
      }
    });
  };

  const reviewDelete = async () => {
    if (selectedReviews.length > 0) {
      try {
        console.log("전달된 리뷰 번호", selectedReviews);
        const response = await axios.delete(
          "http://localhost:8080/members/deleteReviewId",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            data: selectedReviews,
          }
        );
        const message = response.data.body.message;
        Alert("리뷰삭제성공", message, "success").then((result) => {
          if (result.isConfirmed) {
            fetchData();
            setSelectedReviews([]);
          }
        });

        console.log(response.data);
      } catch (error) {
        console.error("리뷰처리 에러:", error);
      }
    }
  };

  const fetchDataMappings = {
    history: async () => {
      const response = await axios.get(
        "http://localhost:8080/members/currentHistory",
        config
      );
      setItems(response.data);
      setCurrentHeaders(headers.medeicalhistory);
      setTitle("진료내역조회");
    },
    inquiry: async () => {
      const response = await axios.get(
        "http://localhost:8080/members/getMemberInquiryList",

        config
      );
      setItems(response.data);
      setCurrentHeaders(headers.inquiry);
      setTitle("1:1문의");
    },
    review: async () => {
      const response = await axios.get(
        "http://localhost:8080/members/getMemberReview",
        config
      );
      setItems(response.data);
      setCurrentHeaders(headers.reviews);
      setTitle("리뷰관리");
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchFunction = fetchDataMappings[selectedType];
      if (fetchFunction) {
        await fetchFunction();
      } else {
        // 기본 혹은 예외 처리
        console.log("Selected type not found");
      }
    } catch (err) {
      console.error("사용자 목록 에러 :", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedType, token, isModalOpen]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <UpdateListContext.Provider value={fetchData}>
      <div className="listWrapper">
        <ListTitle title={title} />

        {selectedType === "review" && (
          <List
            headers={currentHeaders}
            items={items}
            type="Date"
            listType="review"
            buttonType="Y"
            buttonName="삭제"
            onSearch={handleSearch}
            selectable={true}
            onDeleteReviews={reviewDelete}
            onReviewSelect={handleReviewSelect}
            selectedReviews={selectedReviews}
          />
        )}

        {selectedType === "inquiry" && (
          <List
            headers={currentHeaders}
            items={items}
            type="Date"
            buttonType="Y"
            buttonName="작성"
            listType="inquiry"
          />
        )}

        {selectedType !== "review" && selectedType !== "inquiry" && (
          <List
            headers={currentHeaders}
            items={items}
            type="Date"
            buttonType={""}
          />
        )}
      </div>
    </UpdateListContext.Provider>
  );
};

export default UserManagement;
