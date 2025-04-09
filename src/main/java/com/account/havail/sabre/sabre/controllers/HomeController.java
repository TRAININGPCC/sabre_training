package com.account.havail.sabre.sabre.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }


    @GetMapping("/home/login/airlines")
    public String loginAsAirlines() {
        return "LoginAsAirlines";
    }

    @GetMapping("/home/login/agent")
    public String loginAsAgencies() {
        return "LoginAsAgencies";
    }

    @GetMapping("/sso/login/employeeAccount")
    public String loginAsEmployeeAccount() {
        return "SabreEmployeeSSO";
    }

    @GetMapping("/login/host")
    public String loginAsHost() {
        return "SabreEmployeeHostPSS";
    }

}



