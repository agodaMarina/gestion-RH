package com.safer.RH.services;

import com.safer.RH.Dto.CspDto;
import com.safer.RH.models.Csp;
import com.safer.RH.repositories.CspRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CspService {
    private final CspRepository cspRepository;

    public List<CspDto> getAllCsps() {
        var cspDtos = new ArrayList<CspDto>();
        for (Csp csp : cspRepository.findAll()) {
            cspDtos.add(new CspDto(csp.getId(), csp.getLibelle()));
        }
        return cspDtos;
    }

    public Csp getCspById(int id) {
        return cspRepository.findById(id).orElse(null);
    }

    public Csp addCsp(Csp csp) {
        return cspRepository.save(csp);
    }

    public Csp updateCsp(Csp csp) {
        return cspRepository.save(csp);
    }
}
