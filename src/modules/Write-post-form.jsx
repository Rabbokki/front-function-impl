import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';  // Import useSelector
import { useNavigate } from 'react-router-dom';

import { createPost, updatePost, getPostById } from '../hooks/reducer/post/postThunk';
import { clearPostState } from '../hooks/reducer/post/postSlice';

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

export function WritePostForm({ postId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use useSelector to get the post from the Redux store
  const existingPost = useSelector(state => state.posts.post);
  const isEditMode = Boolean(existingPost);

  const [postTitle, setPostTitle] = useState(existingPost?.title || '');
  const [postContent, setPostContent] = useState(existingPost?.content || '');
  const [postCategory, setPostCategory] = useState(existingPost?.category || 'TIPS');
  const [postTags, setPostTags] = useState(existingPost?.tags?.join(', ') || '');
  const [images, setImages] = useState(
    existingPost?.imgUrl?.map((url) => ({
      id: Date.now() + Math.random(),
      file: null,
      preview: url,
    })) || []
  );
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!postId) {
      dispatch(clearPostState());
    }
  }, [dispatch, postId]);

  // Fetch post data when postId is provided and the post is not already loaded
  useEffect(() => {
    if (postId && !existingPost) {
      dispatch(getPostById(postId));  // Fetch the post if it's not in Redux already
    }
  }, [dispatch, postId, existingPost]);

  useEffect(() => {
  if (existingPost) {
    setPostTitle(existingPost.title || '');
    setPostContent(existingPost.content || '');
    setPostCategory(existingPost.category || 'TIPS');
    setPostTags(existingPost.tags?.join(' ') || '');
    setImages(
      existingPost.imgUrl?.map((url) => ({
        id: Date.now() + Math.random(),
        file: null,
        preview: url,
      })) || []
    );
  } else if (!isEditMode) {
    // Ensure fields are blank if creating
    setPostTitle('');
    setPostContent('');
    setPostCategory('TIPS');
    setPostTags('');
    setImages([]);
  }
}, [existingPost, isEditMode]);

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
    images.forEach((image) => {
      if (image.file) {
        formData.append("postImg", image.file);
      }
    });

    console.log('category: ', postCategory);

    const dto = {
      title: postTitle ?? '',
      content: postContent ?? '',
      category: postCategory?.toUpperCase() ?? '',
      tags: postTags ? postTags.split(' ').map((tag) => tag.trim()) : [],
      imgUrl: images
        .filter((image) => !image.file && image.preview)
        .map((image) => image.preview),
    };

    formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));

    try {
      if (isEditMode) {
        console.log("existingPostId:", existingPost.id)
        const result = await dispatch(updatePost({ postId: existingPost.id, formData })).unwrap();
        alert('게시글이 수정되었습니다!');
      } else {
        const result = await dispatch(createPost(formData)).unwrap();
        alert('게시글이 등록되었습니다!');
      }
      navigate('/community');
    } catch (error) {
      console.error('게시글 처리 실패:', error);
      alert('게시글 처리 실패: ' + error);
    }
  };

  const handleCancel = () => {
    if (window.confirm('작성 중인 내용이 저장되지 않습니다. 정말 취소하시겠습니까?')) {
      navigate('/community');
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
              <SelectContent className="z-50 bg-white shadow-md">
                <SelectItem value="TIPS">꿀팁 게시판</SelectItem>
                <SelectItem value="FREE">자유게시판</SelectItem>
                <SelectItem value="MATE">여행메이트</SelectItem>
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
                        className="absolute inset-0 w-full h-full object-cover"
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
              placeholder="예: 도쿄 일본 꿀팁"
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

// export const createPost = createAsyncThunk(
//   'post/create',
//   async (formData, thunkAPI) => {
//     try {
//       // Send the already built FormData directly to the backend
//       const response = await axiosInstance.post(`${API_BASE_URL}/create`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         withCredentials: true,
//       });

//       console.log("response.data from postThunk.js: ", response.data);
//       return response.data;
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || '게시글 생성 실패';
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );