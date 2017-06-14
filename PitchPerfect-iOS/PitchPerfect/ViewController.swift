//
//  ViewController.swift
//  PitchPerfect
//
//  Created by Humad Syed on 6/13/17.
//  Copyright © 2017 Humad Syed. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var recordingButton: UIButton!
    @IBOutlet weak var recordingLabel: UILabel!
    @IBOutlet weak var stopRecordingButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        stopRecordingButton.isEnabled = false
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        print("View is about to appear")
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        print("View has appeared")
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func recordAudio(_ sender: Any) {
        print("Record button was pressed")
        recordingLabel.text = "Recording in progress"
        recordingButton.isEnabled = false
        stopRecordingButton.isEnabled = true
    }
    
    @IBAction func stopRecording(_ sender: Any) {
        print("Stop recording button was pressed")
        recordingLabel.text = "Tap to record"
        recordingButton.isEnabled = true
        stopRecordingButton.isEnabled = false
    }
}

