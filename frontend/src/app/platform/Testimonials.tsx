"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const Testimonials = () => {
  type Testimonial = z.infer<typeof Testimonial>;

  const Testimonial = z.object({
    id: z.uuid().optional(),
    feedback: z.string().min(2).max(384),
    // image_url: z
    //   .any()
    //   .refine((files) => files?.length > 0, "Image is required")
    //   .refine(
    //     (files) => files?.[0]?.size <= 5 * 1024 * 1024,
    //     "File size must be less than 5MB"
    //   )
    //   .refine(
    //     (files) =>
    //       ["image/jpeg", "image/png", "image/jpg"].includes(files?.[0]?.type),
    //     "Only JPEG and PNG files are allowed"
    //   ),
    name: z.string().min(2).max(24),
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Testimonial>({ resolver: zodResolver(Testimonial) });

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
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-screen">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="relative p-4 w-1/2">
          <div className="flex items-center mb-2">
            {/* <Image
                src={testimonial.image_url || "/default-avatar.png"}
                alt="User Avatar"
                width={50}
                height={50}
                className="rounded-full mr-2"
              /> */}
          </div>
          {updating ? (
            <input
              type="text"
              className="font-bold text-xl my-2"
              defaultValue={testimonial.name}
            />
          ) : (
            <div className="font-bold text-xl my-2">{testimonial.name}</div>
          )}
          {updating ? (
            <textarea
              className="w-[85%]"
              defaultValue={testimonial.feedback}
              {...register("feedback", { required: true })}
            />
          ) : (
            <div className="w-[85%]">{testimonial.feedback}</div>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 absolute top-1/2 bottom-1/2 right-2 transform -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-300"
            onClick={() => handleDeleteTestimonial(testimonial)}
          >
            <path d="M17 4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7V2H17V4ZM9 9V17H11V9H9ZM13 9V17H15V9H13Z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 absolute top-1/2 bottom-1/2 right-20 transform -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-300"
            onClick={() => {
              setUpdating(!updating);
            }}
          >
            <path
              d={
                updating
                  ? "M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                  : "M15.9498 2.39017L21.6066 8.04702C21.9972 8.43755 21.9972 9.07071 21.6066 9.46124L13.8285 17.2394L11.7071 17.9465L10.2929 19.3607C9.90241 19.7513 9.26925 19.7513 8.87872 19.3607L4.63608 15.1181C4.24556 14.7276 4.24556 14.0944 4.63608 13.7039L6.0503 12.2897L6.7574 10.1683L14.5356 2.39017C14.9261 1.99964 15.5593 1.99964 15.9498 2.39017ZM16.6569 5.9257L10.2929 12.2897L11.7071 13.7039L18.0711 7.33992L16.6569 5.9257ZM4.28253 16.8859L7.11096 19.7143L5.69674 21.1285L1.4541 19.7143L4.28253 16.8859Z"
              }
            ></path>
          </svg>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
