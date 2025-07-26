package com.hackathon_hub.hackathon_hub_api.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface FileService {
    public String uploadImage(MultipartFile imageFile, String dir) throws Exception;
}
