"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type Testimonial = z.infer<typeof Testimonial>;

const Testimonial = z.object({
  id: z.uuid().optional(),
  feedback: z.string().min(2).max(384),
  image_url: z
    .any()
    .refine((files) => files?.length > 0, "Image is required")
    .refine(
      (files) => files?.[0]?.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    )
    .refine(
      (files) =>
        ["image/jpeg", "image/png", "image/jpg"].includes(files?.[0]?.type),
      "Only JPEG and PNG files are allowed"
    ),
  name: z.string().min(2).max(24),
});

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Testimonial>({ resolver: zodResolver(Testimonial) });

  const watchedImage = watch("image_url");

  useEffect(() => {
    if (watchedImage && watchedImage[0]) {
      const file = watchedImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [watchedImage]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8081/api/v1/testimonial"
      );
      setTestimonials(response.data.data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleCreateFormSubmit: SubmitHandler<Testimonial> = async (data) => {
    try {
      setLoading(true);

      const imageFile = data.image_url[0];
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("feedback", data.feedback);
      formData.append("image", imageFile); // Must match @RequestParam("image") in backend

      const response = await axios.post(
        "http://localhost:8080/api/v1/testimonial",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update testimonials
      setTestimonials([...testimonials, response.data]);
      reset();
      setUploadedImage(null);
      setShowCreate(false);
      setCurrentTestimonial(testimonials.length);
    } catch (error) {
      console.error("Error creating testimonial:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTestimonial = async (testimonialToDelete: Testimonial) => {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:8081/api/v1/testimonial/${testimonialToDelete.id}`
      );

      const updatedTestimonials = testimonials.filter(
        (t) => t.id !== testimonialToDelete.id
      );
      setTestimonials(updatedTestimonials);

      if (currentTestimonial >= updatedTestimonials.length) {
        setCurrentTestimonial(Math.max(0, updatedTestimonials.length - 1));
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="px-4 py-20 text-white flex items-center justify-center">
        <div className="text-4xl text-black">Loading testimonials...</div>
      </div>
    );
  }

  return (
    <div id="testimonials" className="px-4 py-20 text-white relative">
      <div className="text-black text-8xl mb-4">Testimonials</div>
      <div className="flex !h-[600px] gap-4 overflow-hidden">
        {testimonials.map((testimonial, index) =>
          currentTestimonial === index ? (
            <div
              key={index}
              className="relative bg-black w-4xl flex flex-col items-baseline justify-between"
            >
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                {showEdit ? (
                  testimonial.image_url && (
                    <>
                      <Image
                        src={testimonial.image_url}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          boxShadow: "inset 0 0 200px 50px rgba(0,0,0,0.6)",
                        }}
                      ></div>
                    </>
                  )
                ) : (
                  <div className="absolute top-2/5 left-4 transform -translate-y-1/2">
                    <label
                      htmlFor="image_upload"
                      className="text-white/50 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-20 w-20"
                      >
                        <path d="M2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918ZM20 15V5H4V19L14 9L20 15ZM20 17.8284L14 11.8284L6.82843 19H20V17.8284ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path>
                      </svg>
                      <input
                        {...register("image_url")}
                        id="image_upload"
                        type="file"
                        className="hidden"
                      />
                    </label>
                    {errors.image_url && (
                      <div className="text-2xl m-1 text-red-500">
                        {/* {errors.image_url.message} */}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {showEdit ? (
                <div className="absolute top-4 p-1 left-4 text-6xl w-[140%]">
                  {testimonial.name}
                </div>
              ) : (
                <div className="absolute top-4 left-4 ">
                  <input
                    {...register("name")}
                    type="text"
                    placeholder={testimonial.name}
                    className="p-1 text-6xl border-1 border-white w-[140%]"
                  />
                  {errors.name && (
                    <div className="text-2xl m-1 text-red-500">
                      {errors.name.message}
                    </div>
                  )}
                </div>
              )}
              {showEdit ? (
                <div className="absolute bottom-4 p-1 left-4 text-3xl w-[80%] max-h-[40%]">
                  {testimonial.feedback}
                </div>
              ) : (
                <div className="absolute bottom-4 left-4 w-[80%] h-[40%]">
                  <textarea
                    {...register("feedback")}
                    placeholder={testimonial.feedback}
                    className="p-1 text-3xl align-text-bottom border-1 border-white w-full h-[90%]"
                  />
                  {errors.feedback && (
                    <div className="text-2xl m-1 text-red-500">
                      {errors.feedback.message}
                    </div>
                  )}
                </div>
              )}
              <button
                onClick={() => setShowEdit(!showEdit)}
                className="absolute bottom-20 right-4 bg-white text-black p-2 text-4xl w-24 cursor-pointer"
              >
                {showEdit ? "Edit" : "Save"}
              </button>
              <button
                onClick={() => handleDeleteTestimonial(testimonial)}
                className="absolute bottom-4 right-4 bg-white text-black p-2 text-4xl w-24 cursor-pointer"
              >
                Delete
              </button>
            </div>
          ) : (
            <div
              key={index}
              className="bg-black w-40 cursor-pointer hover:scale-105 transition-all duration-300"
              onClick={() => {
                setCurrentTestimonial(index);
                setShowCreate(false);
              }}
            >
              <div className="flex items-center justify-center text-5xl text-center rotate-90 h-full w-full whitespace-nowrap">
                {testimonial.name}
              </div>
            </div>
          )
        )}
        {showCreate ? (
          <form
            onSubmit={handleSubmit(handleCreateFormSubmit)}
            className="relative bg-black w-4xl flex flex-col items-baseline justify-between"
          >
            <div className="absolute top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <label
                htmlFor="image_upload_create"
                className="cursor-pointer w-full"
              >
                {uploadedImage ? (
                  <div className="relative w-64 h-64 border-2 border-white rounded-lg overflow-hidden">
                    <Image
                      src={uploadedImage}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                        Click to change
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-white/50 border-2 border-white/50 border-dashed p-8 text-3xl w-64 h-64 flex flex-col items-center justify-center rounded-lg hover:border-white/70 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-16 w-16 mb-4"
                    >
                      <path d="M2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918ZM20 15V5H4V19L14 9L20 15ZM20 17.8284L14 11.8284L6.82843 19H20V17.8284ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path>
                    </svg>
                    <span className="text-center">Upload an image</span>
                  </div>
                )}
                <input
                  {...register("image_url")}
                  id="image_upload_create"
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  className="hidden"
                />
              </label>
              {errors.image_url && (
                <div className="text-2xl m-1 text-red-500 text-center">
                  {/* {errors.image_url.message} */}
                </div>
              )}
            </div>
            <div className="absolute top-4 left-4">
              <input
                {...register("name")}
                type="text"
                placeholder="Enter your name"
                className="p-1 text-6xl border-1 border-white w-[140%] bg-transparent text-white placeholder-white/50"
              />
              {errors.name && (
                <div className="text-2xl m-1 text-red-500">
                  {errors.name.message}
                </div>
              )}
            </div>

            <div className="absolute bottom-4 left-4 w-[80%] h-[40%]">
              <textarea
                {...register("feedback")}
                placeholder="Enter your feedback"
                className="p-1 text-3xl align-text-bottom border-1 border-white w-full h-[90%] bg-transparent text-white placeholder-white/50 resize-none"
              />
              {errors.feedback && (
                <div className="text-2xl m-1 text-red-500">
                  {errors.feedback.message}
                </div>
              )}
            </div>
            <button
              className="absolute bottom-4 right-4 bg-white text-black p-2 text-4xl w-24 cursor-pointer hover:bg-gray-200 transition-colors"
              type="submit"
              disabled={loading}
            >
              {loading ? "..." : "Save"}
            </button>
          </form>
        ) : (
          <div
            className="bg-black w-40 cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={() => {
              setShowCreate(!showCreate);
              setUploadedImage(null);
              reset();
              setCurrentTestimonial(10);
            }}
          >
            <div className="flex items-center justify-center text-5xl text-center rotate-90 h-full w-full whitespace-nowrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white right-4 w-12 h-12 cursor-pointer hover:scale-110 transition-transform"
              >
                <path d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"></path>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
