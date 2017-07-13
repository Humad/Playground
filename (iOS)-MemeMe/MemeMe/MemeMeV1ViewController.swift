//
//  MemeMeV1ViewController.swift
//  MemeMe
//
//  Created by Humad Syed on 7/8/17.
//  Copyright © 2017 Humad Syed. All rights reserved.
//

import UIKit

class MemeMeV1ViewController: UIViewController, UITextFieldDelegate, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var upperText: UITextField!
    @IBOutlet weak var lowerText: UITextField!

    @IBOutlet weak var cameraPickButton: UIButton!
    @IBOutlet weak var imagePickButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        upperText.text = ""
        lowerText.text = ""
        
        upperText.textAlignment = NSTextAlignment.center
        lowerText.textAlignment = NSTextAlignment.center
        
        upperText.delegate = self
        lowerText.delegate = self
        
        // Text attributes
        let memeTextAttributes:[String:Any] = [
            NSStrokeColorAttributeName: UIColor.black,
            NSForegroundColorAttributeName: UIColor.white,
            NSFontAttributeName: UIFont(name: "HelveticaNeue-CondensedBlack", size: 40)!,
            NSStrokeWidthAttributeName: 5]
        
        upperText.defaultTextAttributes = memeTextAttributes
        lowerText.defaultTextAttributes = memeTextAttributes
        
        // Disable camera button if camera not available
        cameraPickButton.isEnabled = UIImagePickerController.isSourceTypeAvailable(.camera)
    }2
    
    override func viewWillAppear(_ animated: Bool) {
        
    }
    
    @IBAction func pickImage(_ sender: Any) {
        let imagePicker = UIImagePickerController()
        imagePicker.delegate = self
        imagePicker.sourceType = .photoLibrary
        present(imagePicker, animated: true, completion: nil)
    }
    
    @IBAction func pickImageFromCamera(_ sender: Any) {
        let imagePicker = UIImagePickerController()
        imagePicker.delegate = self
        imagePicker.sourceType = .camera
        present(imagePicker, animated: true, completion: nil)
    }
    
    // Handles image picking, either through gallery or camera
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        if let image = info[UIImagePickerControllerOriginalImage] as? UIImage {
            imageView.contentMode = .scaleAspectFill
            imageView.image = image
        }
        
        dismiss(animated: true, completion: nil)
    }
    
    // When the picker is cancelled, dismiss it
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        dismiss(animated: true, completion: nil)
    }
    
    // Clear text on editing start
    func textFieldDidBeginEditing(_ textField: UITextField) {
        textField.text = ""
    }
    
    // Dismiss keyboard on return
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        return true
    }
    

}
