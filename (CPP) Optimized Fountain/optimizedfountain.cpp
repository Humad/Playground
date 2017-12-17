#include <iostream>
#include <time.h>
#include <unistd.h>
#include "assignment9.h"


using cimg_library::CImg;
using cimg_library::CImgDisplay;
using std::vector;
using std::sin;
using std::cos;

const float pi = 3.14159265358979323846;
const float twoPi = 2 * pi;
const float piOverEighteen = pi / 18;
const int focalLength = 60;
const float angle = pi / 9;
const int color[] = {0, 0, 255};
const Vector3 gravity(0, 0, -9.8);

// Time the execution of states
double GetMonotonicTime() {
  timespec ts;
  clock_gettime(CLOCK_MONOTONIC, &ts);
  const double time =
  static_cast<double>(ts.tv_sec) + static_cast<double>(ts.tv_nsec)*(1.0E-9);
  return time;
}

// Randomly initialize particle states
double Rand() {
  return rand() / static_cast<double>(RAND_MAX);
}

Particle::Particle() {
  assignInitialValues();
}

void Particle::Update() {
  const float timeChange = GetMonotonicTime() - t0;

  // Update position
  p = p0 + (v0 * timeChange) + (0.5 * gravity * timeChange * timeChange);

}

bool Particle::Reflect() {

  const float prevZ = p.GetZ();

  if (prevZ >= 0) {
    return false;
  }

  // Reset time
  t0 = GetMonotonicTime();

  // Change Z
  p.SetZ(prevZ * -1);

  // Update initial position
  p0.SetX(p.GetX());
  p0.SetY(p.GetY());
  p0.SetZ(p.GetZ());

  // Loss of energy
  v0.SetZ(v0.GetZ() * 0.25);

  return true;
}

bool Particle::CheckAndReset() {

  if (v0.GetZ() >= 0.05) {
    return false;
  }

  assignInitialValues();

  return true;

}

void Particle::assignInitialValues() {

  // Set initial position
  p0.SetX(0);
  p0.SetY(0);
  p0.SetZ(0);
  p.SetX(0);
  p.SetY(0);
  p.SetZ(0);

  // Set starting time
  t0 = GetMonotonicTime();


  // Set initial velocity
  const float speed = 9.0 + (Rand() * 2);
  const float angleY = Rand() * piOverEighteen;
  const float angleX = Rand() * twoPi;
  const float sinY = sin(angleY);

  v0.SetX(speed * sinY * cos(angleX));
  v0.SetY(speed * sinY * sin(angleX));
  v0.SetZ(speed * cos(angleY));

}

void TransformPoint(const Vector3& p, Vector3* p_img) {
  p_img->SetX((p.GetX() * focalLength) + 300);
  p_img->SetY(400 - (focalLength * ((cos(angle) * p.GetZ()) - (sin(angle) * p.GetY()))));
}

void PointShadow(const Vector3& point, Vector3* p_shadow) {
  p_shadow->SetX((point.GetX() * focalLength) + 300);
  p_shadow->SetY(400 - (focalLength * (-1 * (sin(angle) * point.GetY()))));
}

void DrawParticles(const std::vector<Particle>& particles,
                   CImg<unsigned char>* img_ptr) {

  Vector3 p_img;
  for (int i = 0; i < particles.size(); i++) {
    TransformPoint(particles.at(i).p, &p_img);
    img_ptr->draw_circle(p_img.GetX(), p_img.GetY(), 1, color, 1);
  }
}

void DrawShadows(const std::vector<Particle>& particles,
                     CImg<unsigned char>* img_ptr) {
  Vector3 p_img;
  for (int i = 0; i < particles.size(); i++) {
    PointShadow(particles.at(i).p, &p_img);
    img_ptr->draw_circle(p_img.GetX(), p_img.GetY(), 1, color, 0.5);
  }
}

/*
Time Run: 25.7053
Particles Handled: 45439044
Particles Per Second 1.76769e+06
*/


