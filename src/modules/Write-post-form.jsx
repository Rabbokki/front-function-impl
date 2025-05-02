import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createPost } from '../hooks/reducer/post/postThunk';

import { Button } from '../../src/modules/Button';
import { Input } from '../../src/modules/Input';
import { Textarea } from '../../src/modules/Textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../src/modules/Select';
import { Card } from '../../src/modules/Card';

import { X, ImageIcon } from 'lucide-react';

export function WritePostForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('tips');
  const [postTags, setPostTags] = useState('');
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);


  const handleImageUpload = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newImages = newFiles.map((file) => ({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      const newImages = newFiles
        .filter((file) => file.type.startsWith('image/'))
        .map((file) => ({
          id: Date.now() + Math.random(),
          file,
          preview: URL.createObjectURL(file),
        }));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach(image => {
      formData.append("img", image.file)
    })

    const newPost = {
      title: postTitle,
      content: postContent,
      category: postCategory,
      tag: postTags
    }

    formData.append("dto", new Blob([JSON.stringify(newPost)], {type: "application/json"}))
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const reader = new FileReader();
    reader.onload = () => {
      console.log("Blob content:", reader.result); // This will show the JSON you packed
    };
    reader.readAsText(formData.get("dto"));

    try {
      const result = await dispatch(createPost(formData)).unwrap();
      console.log("성공: ", result)
      alert('게시글이 등록되었습니다!');
      navigate('/community'); // 성공하면 커뮤니티 페이지로 이동
    } catch (error) {
      console.error('게시글이 등록 실패:', error);
      alert('게시글이 등록 실패: ' + error);
    }
  };

  
  const handleCancel = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('작성 중인 내용이 저장되지 않습니다. 정말 취소하시겠습니까?')) {
      navigate('/community'); // ← 이전 페이지로 이동
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              게시판 선택
            </label>
            <Select value={postCategory} onValueChange={setPostCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="게시판을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tips">꿀팁 게시판</SelectItem>
                <SelectItem value="free">자유게시판</SelectItem>
                <SelectItem value="mate">여행메이트</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              제목
            </label>
            <Input
              id="title"
              placeholder="제목을 입력하세요"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              내용
            </label>
            <Textarea
              id="content"
              placeholder="내용을 입력하세요"
              className="min-h-[300px]"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="images" className="text-sm font-medium">
              이미지 첨부
            </label>
            <div
              className={`flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-4 transition-colors ${
                isDragging ? 'border-[#4dabf7] bg-[#e7f5ff]' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <ImageIcon className="mb-2 h-10 w-10 text-gray-400" />
              <p className="text-sm text-gray-500">
                이미지를 드래그하거나 클릭하여 업로드하세요
              </p>
              <p className="text-xs text-gray-400">
                여러 이미지를 한 번에 선택할 수 있습니다
              </p>
            </div>

            {images.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-sm font-medium">
                  업로드된 이미지 ({images.length})
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {images.map((img) => (
                    <div
                      key={img.id}
                      className="group relative aspect-square overflow-hidden rounded-md"
                    >
                      <img
                        src={img.preview || '/placeholder.svg'}
                        alt="Uploaded image"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        className="absolute right-1 top-1 rounded-full bg-white/80 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(img.id);
                        }}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium">
              태그 (쉼표로 구분)
            </label>
            <Input
              id="tags"
              placeholder="예: 도쿄, 일본, 꿀팁"
              value={postTags}
              onChange={(e) => setPostTags(e.target.value)}
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={handleCancel}>
          취소
        </Button>
        <Button
          type="submit"
          className="bg-[#4dabf7] text-white hover:bg-[#339af0]"
        >
          등록하기
        </Button>
      </div>
    </form>
  );
}
