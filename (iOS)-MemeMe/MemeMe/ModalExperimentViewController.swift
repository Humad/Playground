//
//  ModalExperimentViewController.swift
//  MemeMe
//
//  Created by Humad Syed on 6/21/17.
//  Copyright © 2017 Humad Syed. All rights reserved.
//

import UIKit

class ModalExperimentViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    
    @IBAction func showImagePickerController(_ sender: Any) {
        
        let imagePicker = UIImagePickerController()
        self.present(imagePicker, animated: true, completion: nil)
    }
    
    @IBAction func showAlert(_ sender: Any){
    
        let alertView = UIAlertController()
        alertView.title = "Test alert"
        alertView.message = "Hello there"
        
        let dismissAction = UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.default) {
            action in self.dismiss(animated: true, completion: nil)
        }
        alertView.addAction(dismissAction)
        
        self.present(alertView, animated: true, completion: nil)
    }
    
    @IBAction func showActivityView(_ sender: Any){
        
        let image = UIImage()
        let activityView = UIActivityViewController(activityItems: [image], applicationActivities: nil)
        self.present(activityView, animated: true, completion: nil)
    }

}
