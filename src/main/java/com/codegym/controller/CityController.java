package com.codegym.controller;


import com.codegym.model.City;
import com.codegym.model.Country;
import com.codegym.service.address.ICountryService;
import com.codegym.service.customer.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

@RestController
@RequestMapping("/cities")
public class CityController {

    @Autowired
    private ICityService cityService;

    @Autowired
    private ICountryService countryService;

//    @ModelAttribute("countries")
//    public Iterable<Country> countries() {
//        return countryService.findAll();
//    }

    @GetMapping
    public ModelAndView showIndex() {
        return new ModelAndView("index", "countries", countryService.findAll());
    }


    @GetMapping("/list")
    public ResponseEntity<?> findAllCustomer() {
        return new ResponseEntity<>(cityService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<City> createNewCity(@RequestBody City city) {
        return new ResponseEntity<>(cityService.save(city), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<City> deleteById(@PathVariable Long id) {
        Optional<City> cityOptional = cityService.findById(id);
        if (!cityOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        cityService.remove(id);
        return new ResponseEntity<>(cityOptional.get(), HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<City> editCity(@PathVariable Long id, @RequestBody City city) {
        Optional<City> cityOptional = cityService.findById(id);
        if (!cityOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        city.setId(id);
        return new ResponseEntity<>(cityService.save(city), HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> findById(@PathVariable Long id) {
        Optional<City> cityOptional = cityService.findById(id);
        if (!cityOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cityOptional.get(), HttpStatus.OK);
    }
}
