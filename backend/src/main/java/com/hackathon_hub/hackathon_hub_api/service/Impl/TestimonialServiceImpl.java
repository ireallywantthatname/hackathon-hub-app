package com.hackathon_hub.hackathon_hub_api.service.Impl;

import java.util.List;
import java.util.UUID;

import com.hackathon_hub.hackathon_hub_api.service.FileService;
import org.springframework.stereotype.Service;

import com.hackathon_hub.hackathon_hub_api.dto.response.TestimonialResponseDto;
import com.hackathon_hub.hackathon_hub_api.repository.TestimonialRepository;
import com.hackathon_hub.hackathon_hub_api.service.TestimonialService;
import com.hackathon_hub.hackathon_hub_api.entity.Testimonials;
import com.hackathon_hub.hackathon_hub_api.exception.TestimonialNotFoundException;
import org.springframework.web.multipart.MultipartFile;

@Service
public class TestimonialServiceImpl implements TestimonialService {

    private final TestimonialRepository testimonialRepository;
    private final FileService fileService;

    public TestimonialServiceImpl(TestimonialRepository testimonialRepository, FileService fileService) {
        this.testimonialRepository = testimonialRepository;
        this.fileService = fileService;
    }

    @Override
    public TestimonialResponseDto createTestimonial(String name, String feedback, MultipartFile imageFile) throws Exception {
        // Upload image
        String imagePath = fileService.uploadImage(imageFile, "testimonials");

        // Save testimonial with image url
        Testimonials testimonialEntity = new Testimonials();
        testimonialEntity.setName(name);
        testimonialEntity.setFeedback(feedback);
        testimonialEntity.setImageUrl("/uploads/testimonials/" + imagePath); // public URL

        Testimonials saved = testimonialRepository.save(testimonialEntity);
        return TestimonialResponseDto.fromEntity(saved);
    }

    @Override
    public List<TestimonialResponseDto> getAllTestimonials() {
        List<Testimonials> allTestimonials = testimonialRepository.findAll();
        return allTestimonials.stream().map(TestimonialResponseDto::fromEntity).toList();
    }

    @Override
    public TestimonialResponseDto getTestimonialById(UUID id) {
        Testimonials testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new TestimonialNotFoundException("Testimonial with this id not found."));

        return TestimonialResponseDto.fromEntity(testimonial);
    }

    @Override
    public void deleteTestimonialById(UUID id) {
        testimonialRepository.deleteById(id);
    }

}
