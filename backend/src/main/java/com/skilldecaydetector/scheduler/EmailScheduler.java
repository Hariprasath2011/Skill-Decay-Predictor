//package com.skilldecaydetector.scheduler;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//import com.skilldecaydetector.service.EmailService;
//
//
//@Component
//public class EmailScheduler {
//
//	@Autowired
//	private EmailService emailService;
//
//	@Scheduled(cron = "0 0/100 * * * ?") 
//	public void sendScheduledEmail() {
//
//		String[] recipients = { "madhanmadhan89743@gmail.com"};
//
//		emailService.sendEmail(recipients, "Scheduled Email from Spring Boot",
//				"Hello! This is a scheduled email sent automatically every 10 minutes.");
//	}
//}
