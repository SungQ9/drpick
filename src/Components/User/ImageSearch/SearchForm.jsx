import React, { useState, useRef } from 'react';
import axios from 'axios';
import DrugsPredict from './Predict';
import Pill from '../../../img/pill-icon.png';
import '../../../css/ImageSearchStyle.css';
import Loading from './Loading';
import DBSearch from './DBSearchForm';

function DrugsSearch() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [imagePath, setImagePath] = useState('');
  const [searchButtonText, setSearchButtonText] = useState('검색하기'); // 버튼 텍스트 상태 추가
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const fileInputRef = useRef();

  // 검색 결과가 있는지 여부에 따라 클래스 추가/제거
  const resultClass = predictionResult ? 'withResults' : '';

  const handleReSearch = () => {
    setSearchButtonText('검색하기'); // 버튼 텍스트 초기화
    setSelectedFile(null); // 선택파일 초기화
    setPredictionResult(null); // 예측 결과 초기화
    setImagePreview(null); // 이미지 미리보기 초기화
    setImagePath(''); // 이미지 경로 초기화
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredict = async () => {
    try {
      if (!selectedFile) {
        console.error('파일이 선택되지 않았습니다.');
        alert('파일을 선택해주세요!');
        return;
      }

      setSearchButtonText('검색 중...');
      setLoading(true); // 로딩 시작

      const formData = new FormData();
      formData.append('image', selectedFile);

      // Axios - 이미지 전송
      const response = await axios.post(
        'http://114.207.167.66:5000/api/flask/ocr',
        formData,
      );

      // 서버 응답 확인
      if (response.status === 200) {
        const result = response.data;

        // 예측 결과를 상태에 설정
        setPredictionResult(result);
      } else {
        console.error('예측 실패');
      }
    } catch (error) {
      console.error('예측 중 오류 발생', error);
    } finally {
      if (selectedFile) {
        // 선택된 파일이 있을 때만 버튼 텍스트 변경
        setSearchButtonText('재검색하기'); // 검색 완료 후 버튼 텍스트 변경
      }
      setLoading(false); // 로딩 종료
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className='title' id='searchFormTitle'>
        <h1>약 이미지 검색</h1>
      </div>
      <div className='EntireFormWrapper'>
        <div className={`searchFormWrapper ${resultClass}`}>
          <div className={`searchFormContainer ${resultClass}`}>
            {loading && <Loading />} {/* 로딩 중일 때 로딩 컴포넌트 표시 */}
            <div id='registForm'>
              <h2>약 이미지를 등록해주세요</h2>
              <div className='pill_img'>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt='preview'
                    style={{ width: '200px', height: '200px' }}
                  />
                ) : (
                  <img
                    src={Pill}
                    alt='pill'
                    style={{ width: '200px', height: '200px' }}
                  />
                )}
              </div>

              <input
                type='file'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          </div>
          {/* PredictForm 컴포넌트 렌더링 */}
          <DrugsPredict predictionResult={predictionResult} />
          {imagePath && (
            <div>
              <h3>Uploaded Image</h3>
              <img
                src={`http://114.207.167.66:5000${imagePath}`}
                alt='Uploaded'
              />
            </div>
          )}
          <div>
            <button
              id='btn'
              className={`imageUploadBtn ${resultClass}`}
              onClick={handleClickUpload}
            >
              사진 업로드
            </button>
            <button
              id='btn'
              onClick={
                searchButtonText === '검색하기' ? handlePredict : handleReSearch
              }
            >
              {searchButtonText}
            </button>
          </div>
        </div>
        <div className={`DBSearch ${resultClass}`}>
          {predictionResult ? (
            <DBSearch predictionResult={predictionResult} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default DrugsSearch;
