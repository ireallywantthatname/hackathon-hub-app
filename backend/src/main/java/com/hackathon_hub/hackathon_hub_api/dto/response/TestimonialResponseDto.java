package com.hackathon_hub.hackathon_hub_api.dto.response;

import java.util.UUID;

import com.hackathon_hub.hackathon_hub_api.entity.Testimonials;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class TestimonialResponseDto {
    private UUID id;
    private String name;
    private String feedback;
    private String imageUrl;

    public static TestimonialResponseDto fromEntity(Testimonials testimonial) {
        return new TestimonialResponseDto(
                testimonial.getId(),
                testimonial.getName(),
                testimonial.getFeedback(),
                testimonial.getImageUrl());
    }
}
