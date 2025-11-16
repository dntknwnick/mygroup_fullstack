import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/ProgressBar';
import { Card } from '../../components/Card';
import { Mail, Lock, User, Phone, MapPin, GraduationCap, Briefcase, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const steps = [
  { id: 1, label: 'Account Info' },
  { id: 2, label: 'Personal Info' },
  { id: 3, label: 'Location' },
  { id: 4, label: 'Professional' },
  { id: 5, label: 'Review' }
];

const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'India', 'Germany', 'France'];
const states = ['California', 'Texas', 'New York', 'Florida', 'Illinois', 'Pennsylvania'];
const educationLevels = ['High School', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Other'];
const professions = ['Software Engineer', 'Designer', 'Manager', 'Teacher', 'Doctor', 'Engineer', 'Other'];

export const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const { groupName = 'default' } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', confirmPassword: '',
    firstName: '', lastName: '', phone: '', displayName: '', gender: '', dob: '',
    country: '', state: '', district: '',
    education: '', profession: ''
  });

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate(`/client-login/${groupName}`);
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <Input
              label="Username"
              placeholder="Choose a username"
              leftIcon={<User size={20} />}
              value={formData.username}
              onChange={(e) => updateField('username', e.target.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              leftIcon={<Mail size={20} />}
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              leftIcon={<Lock size={20} />}
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              leftIcon={<Lock size={20} />}
              value={formData.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              required
            />
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                required
              />
              <Input
                label="Last Name"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                required
              />
            </div>
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 000-0000"
              leftIcon={<Phone size={20} />}
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              required
            />
            <Input
              label="Display Name"
              placeholder="How should we call you?"
              value={formData.displayName}
              onChange={(e) => updateField('displayName', e.target.value)}
            />
            <div>
              <label className="block mb-3 text-sm font-medium text-gray-700">Gender</label>
              <div className="flex gap-6">
                {['Male', 'Female', 'Other'].map((gender) => (
                  <label key={gender} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={(e) => updateField('gender', e.target.value)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 cursor-pointer"
                    />
                    <span className="text-gray-700 group-hover:text-gray-900">{gender}</span>
                  </label>
                ))}
              </div>
            </div>
            <Input
              label="Date of Birth"
              type="date"
              value={formData.dob}
              onChange={(e) => updateField('dob', e.target.value)}
              required
            />
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div>
              <label className="block mb-3 text-sm font-medium text-gray-700">Country <span className="text-error-500">*</span></label>
              <select
                value={formData.country}
                onChange={(e) => updateField('country', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                required
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-3 text-sm font-medium text-gray-700">State <span className="text-error-500">*</span></label>
              <select
                value={formData.state}
                onChange={(e) => updateField('state', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all disabled:bg-gray-100"
                required
                disabled={!formData.country}
              >
                <option value="">Select a state</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <Input
              label="District / City"
              placeholder="Enter your district or city"
              leftIcon={<MapPin size={20} />}
              value={formData.district}
              onChange={(e) => updateField('district', e.target.value)}
              required
            />
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div>
              <label className="block mb-3 text-sm font-medium text-gray-700">Education Level <span className="text-error-500">*</span></label>
              <select
                value={formData.education}
                onChange={(e) => updateField('education', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                required
              >
                <option value="">Select education level</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-3 text-sm font-medium text-gray-700">Profession <span className="text-error-500">*</span></label>
              <select
                value={formData.profession}
                onChange={(e) => updateField('profession', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                required
              >
                <option value="">Select profession</option>
                {professions.map((prof) => (
                  <option key={prof} value={prof}>{prof}</option>
                ))}
              </select>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-success-500 to-success-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Check className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ lineHeight: '1.3' }}>Review Your Information</h3>
              <p className="text-base text-gray-600" style={{ lineHeight: '1.6' }}>Please verify all details before submitting</p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="text-lg font-semibold text-gray-900 mb-4" style={{ lineHeight: '1.4' }}>Account Information</h5>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between" style={{ lineHeight: '1.6' }}><span className="text-gray-600">Username:</span> <span className="text-gray-900">{formData.username}</span></p>
                  <p className="flex justify-between" style={{ lineHeight: '1.6' }}><span className="text-gray-600">Email:</span> <span className="text-gray-900">{formData.email}</span></p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="text-lg font-semibold text-gray-900 mb-4" style={{ lineHeight: '1.4' }}>Personal Information</h5>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between" style={{ lineHeight: '1.6' }}><span className="text-gray-600">Name:</span> <span className="text-gray-900">{formData.firstName} {formData.lastName}</span></p>
                  <p className="flex justify-between" style={{ lineHeight: '1.6' }}><span className="text-gray-600">Phone:</span> <span className="text-gray-900">{formData.phone}</span></p>
                  <p className="flex justify-between" style={{ lineHeight: '1.6' }}><span className="text-gray-600">Gender:</span> <span className="text-gray-900">{formData.gender}</span></p>
                  <p className="flex justify-between" style={{ lineHeight: '1.6' }}><span className="text-gray-600">Date of Birth:</span> <span className="text-gray-900">{formData.dob}</span></p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="text-lg font-semibold text-gray-900 mb-4" style={{ lineHeight: '1.4' }}>Location</h5>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between" style={{ lineHeight: '1.6' }}><span className="text-gray-600">Country:</span> <span className="text-gray-900">{formData.country}</span></p>
                  <p className="flex justify-between" style={{ lineHeight: '1.6' }}><span className="text-gray-600">State:</span> <span className="text-gray-900">{formData.state}</span></p>
                  <p className="flex justify-between" style={{ lineHeight: '1.6' }}><span className="text-gray-600">District:</span> <span className="text-gray-900">{formData.district}</span></p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="text-lg font-semibold text-gray-900 mb-4" style={{ lineHeight: '1.4' }}>Professional</h5>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between" style={{ lineHeight: '1.6' }}><span className="text-gray-600">Education:</span> <span className="text-gray-900">{formData.education}</span></p>
                  <p className="flex justify-between" style={{ lineHeight: '1.6' }}><span className="text-gray-600">Profession:</span> <span className="text-gray-900">{formData.profession}</span></p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(`/client-login/${groupName}`)}
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Login</span>
        </motion.button>

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ lineHeight: '1.25' }}>Create Your Account</h2>
          <p className="text-base text-gray-600" style={{ lineHeight: '1.6' }}>Join {groupName} community today</p>
        </div>

        {/* Progress Bar */}
        <ProgressBar steps={steps} currentStep={currentStep} />

        {/* Form Card */}
        <Card variant="elevated" padding="lg" className="mt-16">
          <form onSubmit={handleSubmit}>
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-10 pt-8 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
                leftIcon={<ArrowLeft size={20} />}
                size="lg"
              >
                Previous
              </Button>

              <div className="flex-1" />

              {currentStep < steps.length ? (
                <Button
                  type="button"
                  variant="gradient"
                  onClick={handleNext}
                  rightIcon={<ArrowRight size={20} />}
                  size="lg"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="gradient"
                  loading={loading}
                  rightIcon={<Check size={20} />}
                  size="lg"
                >
                  Complete Registration
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Back to Login */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate(`/client-login/${groupName}`)}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
