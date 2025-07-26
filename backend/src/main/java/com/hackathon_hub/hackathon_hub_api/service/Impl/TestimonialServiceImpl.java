package com.hackathon_hub.hackathon_hub_api.service.Impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.hackathon_hub.hackathon_hub_api.dto.response.TestimonialResponseDto;
import com.hackathon_hub.hackathon_hub_api.repository.TestimonialRepository;
import com.hackathon_hub.hackathon_hub_api.service.TestimonialService;
import com.hackathon_hub.hackathon_hub_api.entity.Testimonials;
import com.hackathon_hub.hackathon_hub_api.exception.TestimonialNotFoundException;

@Service
public class TestimonialServiceImpl implements TestimonialService {

    private final TestimonialRepository testimonialRepository;

    public TestimonialServiceImpl(TestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }

    @Override
    public TestimonialResponseDto createTestimonial(TestimonialResponseDto testimonial) {
        Testimonials testimonialEntity = new Testimonials();
        // Map fields from testimonial DTO to entity
        testimonialEntity.setName(testimonial.getName());
        testimonialEntity.setFeedback(testimonial.getFeedback());
        testimonialEntity.setImageUrl(testimonial.getImageUrl());

        Testimonials savedTestimonial = testimonialRepository.save(testimonialEntity);
        return TestimonialResponseDto.fromEntity(savedTestimonial);
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
