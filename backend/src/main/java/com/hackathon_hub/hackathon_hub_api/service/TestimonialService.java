package com.hackathon_hub.hackathon_hub_api.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.hackathon_hub.hackathon_hub_api.dto.response.TestimonialResponseDto;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface TestimonialService {
    public TestimonialResponseDto createTestimonial(String name, String feedback, MultipartFile imageFile) throws Exception;

    public List<TestimonialResponseDto> getAllTestimonials();

    public TestimonialResponseDto getTestimonialById(UUID id);

    public void deleteTestimonialById(UUID id);
}