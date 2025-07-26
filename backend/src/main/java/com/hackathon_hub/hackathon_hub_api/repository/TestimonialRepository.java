package com.hackathon_hub.hackathon_hub_api.repository;

import com.hackathon_hub.hackathon_hub_api.entity.Testimonials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TestimonialRepository extends JpaRepository<Testimonials, UUID> {
}
