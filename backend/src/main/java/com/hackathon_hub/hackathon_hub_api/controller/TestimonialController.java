package com.hackathon_hub.hackathon_hub_api.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackathon_hub.hackathon_hub_api.dto.response.TestimonialResponseDto;
import com.hackathon_hub.hackathon_hub_api.dto.response.common.ApiResponse;
import com.hackathon_hub.hackathon_hub_api.service.TestimonialService;

@RestController
@RequestMapping("/api/v1/testimonial")
public class TestimonialController {

    private final TestimonialService testimonialService;

    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Object>> createTestimonial(
            @RequestBody TestimonialResponseDto testimonialResponseDto) {
        TestimonialResponseDto createdTestimonial = testimonialService.createTestimonial(testimonialResponseDto);

        ApiResponse<Object> response = new ApiResponse<>(
                true,
                "Testimonial created successfully.",
                createdTestimonial);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
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
