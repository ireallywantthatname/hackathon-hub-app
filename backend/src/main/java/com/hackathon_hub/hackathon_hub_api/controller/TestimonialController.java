package com.hackathon_hub.hackathon_hub_api.controller;

import java.util.List;
import java.util.UUID;

import com.hackathon_hub.hackathon_hub_api.entity.Testimonials;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hackathon_hub.hackathon_hub_api.dto.response.TestimonialResponseDto;
import com.hackathon_hub.hackathon_hub_api.dto.response.common.ApiResponse;
import com.hackathon_hub.hackathon_hub_api.service.TestimonialService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/testimonial")
public class TestimonialController {

    private final TestimonialService testimonialService;

    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @PostMapping
    public ResponseEntity<TestimonialResponseDto> createTestimonial(
            @RequestParam("name") String name,
            @RequestParam("feedback") String feedback,
            @RequestParam("image") MultipartFile imageFile) {
        try {
            TestimonialResponseDto response = testimonialService.createTestimonial(name, feedback, imageFile);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Object>> getAllTestimonials() {
        List<TestimonialResponseDto> allTestimonials = testimonialService.getAllTestimonials();

        ApiResponse<Object> response = new ApiResponse<>(
                true,
                "Testimonials retrieved successfully.",
                allTestimonials);

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> getTestimonialById(@PathVariable UUID id) {
        TestimonialResponseDto testimonial = testimonialService.getTestimonialById(id);

        ApiResponse<Object> response = new ApiResponse<>(
                true,
                "Testimonial retrieved successfully.",
                testimonial);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteTestimonialById(@PathVariable UUID id) {
        testimonialService.deleteTestimonialById(id);

        ApiResponse<Object> response = new ApiResponse<>(
                true,
                "Testimonial deleted successfully.",
                null);

        return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
    }
}
