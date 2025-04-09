package com.account.havail.sabre.sabre.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ContactUsController {

    @GetMapping("/contact-us")
    public String showContactPage(Model model) {
        return "contact-us";  // this maps to src/main/resources/templates/contact-us.html
    }

}
