//
//  ImagePickerDelegate.swift
//  MemeMe
//
//  Created by Humad Syed on 7/9/17.
//  Copyright © 2017 Humad Syed. All rights reserved.
//

import UIKit

class ImagePickerDelegate: NSObject, UIImagePickerControllerDelegate{
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        self.dismiss(animated: true, completion: nil)
    }
    
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        self.dismiss(animated: true, completion: nil)
    }
}
