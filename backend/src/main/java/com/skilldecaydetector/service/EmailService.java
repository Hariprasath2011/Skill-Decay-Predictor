package com.skilldecaydetector.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender emailSender;

	public void sendSimpleMessage(String to, String subject, String text) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setFrom("noreply@skilldecay.com");
			message.setTo(to);
			message.setSubject(subject);
			message.setText(text);
			emailSender.send(message);
		} catch (Exception e) {
			System.out.println("==================================================");
			System.out.println("EMAIL SERVICE ERROR (Likely missing credentials in application.properties)");
			System.out.println("Displaying email content in console instead:");
			System.out.println("TO: " + to);
			System.out.println("SUBJECT: " + subject);
			System.out.println("TEXT: \n" + text);
			System.out.println("==================================================");
		}
	}
}
