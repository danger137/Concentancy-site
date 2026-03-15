'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Subscriber {
    id: string;
    email: string;
    createdAt?: string;
}

export default function AdminNewsletter() {
    const [activeTab, setActiveTab] = useState<'subscribers' | 'compose' | 'blogs' | 'events' | 'team' | 'services' | 'settings' | 'successStories' | 'faqs' | 'videos'>('subscribers');
    const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
    const [showEventForm, setShowEventForm] = useState(false);
    const [showTeamForm, setShowTeamForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [showSuccessStoryForm, setShowSuccessStoryForm] = useState(false);
    const [showFaqForm, setShowFaqForm] = useState(false);
    const [showVideoForm, setShowVideoForm] = useState(false);

    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [successStories, setSuccessStories] = useState<any[]>([]);
    const [faqs, setFaqs] = useState<any[]>([]);
    const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [blogs, setBlogs] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [team, setTeam] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [videos, setVideos] = useState<any[]>([]);
    const [editingBlog, setEditingBlog] = useState<any | null>(null);
    const [editingEvent, setEditingEvent] = useState<any | null>(null);
    const [editingTeam, setEditingTeam] = useState<any | null>(null);
    const [editingService, setEditingService] = useState<any | null>(null);
    const [editingSuccessStory, setEditingSuccessStory] = useState<any | null>(null);
    const [editingFaq, setEditingFaq] = useState<any | null>(null);
    const [editingVideo, setEditingVideo] = useState<any | null>(null);
    const [successStoryForm, setSuccessStoryForm] = useState({ name: '', feedback: '', image: '', date: '' });
    const [faqForm, setFaqForm] = useState({ question: '', answer: '' });
    const [videoForm, setVideoForm] = useState({ title: '', url: '', thumbnail: '', country: '' });
    const [blogForm, setBlogForm] = useState({ title: '', description: '', content: '', image: '', category: '', date: '' });
    const [eventForm, setEventForm] = useState({
        title: '', description: '', image: '', time: '', location: '', date: '', dayLabel: '', dayId: '', color: 'bg-light', textWhite: false
    });
    const [teamForm, setTeamForm] = useState({
        name: '', role: '', description: '', image: '', twitter: '', instagram: '', linkedin: ''
    });
    const [serviceForm, setServiceForm] = useState({
        title: '', description: '', image: '', icon: 'globe'
    });
    const [settingsForm, setSettingsForm] = useState({
        email: 'Infinityconsultantsfsd@gmail.com',
        phone: '+92 326 4571906',
        location: 'Mazzanine floor, Media com plaza, Office No. 63, 64 Kohinoor Rd, Faisalabad'
    });
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    // Auto-dismiss alerts after 4 seconds
    const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const showStatus = useCallback((s: { type: 'success' | 'error'; text: string }) => {
        setStatus(s);
        if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
        statusTimerRef.current = setTimeout(() => setStatus(null), 4000);
    }, []);

    // Auth guard: redirect if no admin cookie
    useEffect(() => {
        if (!document.cookie.includes('admin_auth=true')) {
            router.push('/login');
        }
    }, [router]);

    // Parallel data fetching — all 6 APIs at the same time (3x faster load)
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchAll = async () => {
            setFetching(true);
            try {
                const [subRes, blogRes, eventRes, teamRes, svcRes, setRes, storyRes, faqRes, vidRes] = await Promise.allSettled([
                    fetch('/api/admin/tools?action=subscribers', { signal }),
                    fetch('/api/admin/cms/blog', { signal }),
                    fetch('/api/admin/cms/event', { signal }),
                    fetch('/api/admin/cms/teamMember', { signal }),
                    fetch('/api/admin/cms/service', { signal }),
                    fetch('/api/admin/tools?action=settings', { signal }),
                    fetch('/api/admin/cms/successStory', { signal }),
                    fetch('/api/admin/cms/faq', { signal }),
                    fetch('/api/admin/cms/video', { signal }),
                ]);
                if (subRes.status === 'fulfilled' && subRes.value.ok) {
                    const d = await subRes.value.json(); if (Array.isArray(d)) setSubscribers(d);
                }
                if (blogRes.status === 'fulfilled' && blogRes.value.ok) {
                    const d = await blogRes.value.json(); if (Array.isArray(d)) setBlogs(d);
                }
                if (eventRes.status === 'fulfilled' && eventRes.value.ok) {
                    const d = await eventRes.value.json(); if (Array.isArray(d)) setEvents(d);
                }
                if (teamRes.status === 'fulfilled' && teamRes.value.ok) {
                    const d = await teamRes.value.json(); if (Array.isArray(d)) setTeam(d);
                }
                if (svcRes.status === 'fulfilled' && svcRes.value.ok) {
                    const d = await svcRes.value.json(); if (Array.isArray(d)) setServices(d);
                }
                if (setRes.status === 'fulfilled' && setRes.value.ok) {
                    const d = await setRes.value.json(); if (d?.email) setSettingsForm(d);
                }
                if (storyRes.status === 'fulfilled' && storyRes.value.ok) {
                    const d = await storyRes.value.json(); if (Array.isArray(d)) setSuccessStories(d);
                }
                if (faqRes.status === 'fulfilled' && faqRes.value.ok) {
                    const d = await faqRes.value.json(); if (Array.isArray(d)) setFaqs(d);
                }
                if (vidRes.status === 'fulfilled' && vidRes.value.ok) {
                    const d = await vidRes.value.json(); if (Array.isArray(d)) setVideos(d);
                }
            } catch (e: unknown) {
                if (e instanceof DOMException && e.name === 'AbortError') return;
                console.error('Fetch error:', e);
            } finally {
                setFetching(false);
            }
        };
        fetchAll();
        return () => controller.abort();
    }, []);

    // Individual refetch helpers (used after CRUD operations)
    const fetchSubscribers = async () => {
        try {
            const res = await fetch('/api/admin/tools?action=subscribers');
            const data = await res.json();
            if (res.ok && Array.isArray(data)) setSubscribers(data);
        } catch (e) { console.error(e); }
    };
    const fetchBlogs = async () => {
        try {
            const res = await fetch('/api/admin/cms/blog');
            const data = await res.json();
            if (res.ok && Array.isArray(data)) setBlogs(data);
        } catch (e) { console.error(e); }
    };
    const fetchEvents = async () => {
        try {
            const res = await fetch('/api/admin/cms/event');
            const data = await res.json();
            if (res.ok && Array.isArray(data)) setEvents(data);
        } catch (e) { console.error(e); }
    };
    const fetchTeam = async () => {
        try {
            const res = await fetch('/api/admin/cms/teamMember');
            const data = await res.json();
            if (res.ok && Array.isArray(data)) setTeam(data);
        } catch (e) { console.error(e); }
    };
    const fetchServices = async () => {
        try {
            const res = await fetch('/api/admin/cms/service');
            const data = await res.json();
            if (res.ok && Array.isArray(data)) setServices(data);
        } catch (e) { console.error(e); }
    };
    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/admin/tools?action=settings');
            const data = await res.json();
            if (res.ok && data?.email) setSettingsForm(data);
        } catch (e) { console.error(e); }
    };
    const fetchSuccessStories = async () => {
        try {
            const res = await fetch('/api/admin/cms/successStory');
            const data = await res.json();
            if (res.ok && Array.isArray(data)) setSuccessStories(data);
        } catch (e) { console.error(e); }
    };
    const fetchFaqs = async () => {
        try {
            const res = await fetch('/api/admin/cms/faq');
            const data = await res.json();
            if (res.ok && Array.isArray(data)) setFaqs(data);
        } catch (e) { console.error(e); }
    };
    const fetchVideos = async () => {
        try {
            const res = await fetch('/api/admin/cms/video');
            const data = await res.json();
            if (res.ok && Array.isArray(data)) setVideos(data);
        } catch (e) { console.error(e); }
    };

    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/admin/tools?action=settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settingsForm),
            });
            if (res.ok) {
                showStatus({ type: 'success', text: '✓ Site settings updated successfully!' });
                fetchSettings();
            }
        } catch (e) { showStatus({ type: 'error', text: 'Error saving settings.' }); }
        finally { setLoading(false); }
    };

    const handleSaveBlog = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const method = editingBlog ? 'PUT' : 'POST';
            const url = editingBlog ? `/api/admin/cms/blog/${editingBlog.id}` : '/api/admin/cms/blog';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blogForm),
            });
            if (res.ok) {
                showStatus({ type: 'success', text: `✓ Blog ${editingBlog ? 'updated' : 'created'} successfully!` });
                setIsBlogFormOpen(false);
                setEditingBlog(null);
                setBlogForm({ title: '', description: '', content: '', image: '', category: '', date: '' });
                fetchBlogs();
            }
        } catch (e) { showStatus({ type: 'error', text: 'Error saving blog.' }); }
        finally { setLoading(false); }
    };

    const deleteBlog = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog?')) return;
        try {
            const res = await fetch(`/api/admin/cms/blog/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showStatus({ type: 'success', text: '✓ Blog deleted successfully.' });
                fetchBlogs();
            }
        } catch (e) { showStatus({ type: 'error', text: 'Error deleting blog.' }); }
    };

    const handleSaveEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const method = editingEvent ? 'PUT' : 'POST';
            const url = editingEvent ? `/api/admin/cms/event/${editingEvent.id}` : '/api/admin/cms/event';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventForm),
            });
            if (res.ok) {
                showStatus({ type: 'success', text: `✓ Event ${editingEvent ? 'updated' : 'created'} successfully!` });
                setShowEventForm(false);
                setEditingEvent(null);
                setEventForm({ title: '', description: '', image: '', time: '', location: '', date: '', dayLabel: '', dayId: '', color: 'bg-light', textWhite: false });
                fetchEvents();
            }
        } catch (e) { showStatus({ type: 'error', text: 'Error saving event.' }); }
        finally { setLoading(false); }
    };

    const deleteEvent = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;
        try {
            const res = await fetch(`/api/admin/cms/event/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showStatus({ type: 'success', text: '✓ Event deleted successfully.' });
                fetchEvents();
            }
        } catch (e) { showStatus({ type: 'error', text: 'Error deleting event.' }); }
    };

    const handleSaveTeam = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const method = editingTeam ? 'PUT' : 'POST';
            const url = editingTeam ? `/api/admin/cms/teamMember/${editingTeam.id}` : '/api/admin/cms/teamMember';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(teamForm),
            });
            if (res.ok) {
                showStatus({ type: 'success', text: `✓ Team member ${editingTeam ? 'updated' : 'created'} successfully!` });
                setShowTeamForm(false);
                setEditingTeam(null);
                setTeamForm({ name: '', role: '', description: '', image: '', twitter: '', instagram: '', linkedin: '' });
                fetchTeam();
            }
        } catch (e) { showStatus({ type: 'error', text: 'Error saving team member.' }); }
        finally { setLoading(false); }
    };

    const deleteTeam = async (id: string) => {
        if (!confirm('Are you sure you want to delete this team member?')) return;
        try {
            const res = await fetch(`/api/admin/cms/teamMember/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showStatus({ type: 'success', text: '✓ Team member deleted successfully.' });
                fetchTeam();
            }
        } catch (e) { showStatus({ type: 'error', text: 'Error deleting team member.' }); }
    };

    const handleSaveSuccessStory = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const method = editingSuccessStory ? 'PUT' : 'POST';
            const url = editingSuccessStory ? `/api/admin/cms/successStory/${editingSuccessStory.id}` : '/api/admin/cms/successStory';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(successStoryForm),
            });
            if (res.ok) {
                showStatus({ type: 'success', text: `✓ Success Story ${editingSuccessStory ? 'updated' : 'created'} successfully!` });
                setShowSuccessStoryForm(false);
                setEditingSuccessStory(null);
                setSuccessStoryForm({ name: '', feedback: '', image: '', date: '' });
                fetchSuccessStories();
            }
        } catch (e) { showStatus({ type: 'error', text: 'Error saving success story.' }); }
        finally { setLoading(false); }
    };

    const deleteSuccessStory = async (id: string) => {
        if (!confirm('Are you sure you want to delete this success story?')) return;
        try {
            const res = await fetch(`/api/admin/cms/successStory/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showStatus({ type: 'success', text: '✓ Success Story deleted successfully.' });
                fetchSuccessStories();
            }
        } catch (e) { showStatus({ type: 'error', text: 'Error deleting success story.' }); }
    };

    const handleSaveService = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const method = editingService ? 'PUT' : 'POST';
            const url = editingService ? `/api/admin/cms/service/${editingService.id}` : '/api/admin/cms/service';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(serviceForm),
            });
            if (res.ok) {
                showStatus({ type: 'success', text: `✓ Service ${editingService ? 'updated' : 'created'} successfully!` });
                setShowServiceForm(false);
                setEditingService(null);
                setServiceForm({ title: '', description: '', image: '', icon: 'globe' });
                fetchServices();
            }
        } catch (e) { showStatus({ type: 'error', text: 'Error saving service.' }); }
        finally { setLoading(false); }
    };

    const deleteService = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;
        try {
            const res = await fetch(`/api/admin/cms/service/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showStatus({ type: 'success', text: '✓ Service deleted successfully.' });
                fetchServices();
            }
        } catch (e) { showStatus({ type: 'error', text: 'Error deleting service.' }); }
    };

    const handleSaveFaq = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const method = editingFaq ? 'PUT' : 'POST';
            const url = editingFaq ? `/api/admin/cms/faq/${editingFaq.id}` : '/api/admin/cms/faq';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(faqForm),
            });
            if (res.ok) {
                showStatus({ type: 'success', text: `✓ FAQ ${editingFaq ? 'updated' : 'created'} successfully!` });
                setShowFaqForm(false);
                setEditingFaq(null);
                setFaqForm({ question: '', answer: '' });
                fetchFaqs();
            }
        } catch (e) { showStatus({ type: 'error', text: 'Error saving FAQ.' }); }
        finally { setLoading(false); }
    };

    const deleteFaq = async (id: string) => {
        if (!confirm('Are you sure you want to delete this FAQ?')) return;
        try {
            const res = await fetch(`/api/admin/cms/faq/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showStatus({ type: 'success', text: '✓ FAQ deleted successfully.' });
                fetchFaqs();
            }
        } catch (e) { showStatus({ type: 'error', text: 'Error deleting FAQ.' }); }
    };

    const handleSaveVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const method = editingVideo ? 'PUT' : 'POST';
            const url = editingVideo ? `/api/admin/cms/video/${editingVideo.id}` : '/api/admin/cms/video';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(videoForm),
            });
            if (res.ok) {
                showStatus({ type: 'success', text: `✓ Video ${editingVideo ? 'updated' : 'created'} successfully!` });
                setShowVideoForm(false);
                setEditingVideo(null);
                setVideoForm({ title: '', url: '', thumbnail: '', country: '' });
                fetchVideos();
            }
        } catch (e) { showStatus({ type: 'error', text: 'Error saving Video.' }); }
        finally { setLoading(false); }
    };

    const deleteVideo = async (id: string) => {
        if (!confirm('Are you sure you want to delete this Video?')) return;
        try {
            const res = await fetch(`/api/admin/cms/video/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showStatus({ type: 'success', text: '✓ Video deleted successfully.' });
                fetchVideos();
            }
        } catch (e) { showStatus({ type: 'error', text: 'Error deleting Video.' }); }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'blog' | 'event' | 'team' | 'service' | 'successStory' | 'videoThumbnail') => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch('/api/admin/tools?action=upload-image', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                if (target === 'blog') setBlogForm(prev => ({ ...prev, image: data.url }));
                else if (target === 'event') setEventForm(prev => ({ ...prev, image: data.url }));
                else if (target === 'team') setTeamForm(prev => ({ ...prev, image: data.url }));
                else if (target === 'service') setServiceForm(prev => ({ ...prev, image: data.url }));
                else if (target === 'successStory') setSuccessStoryForm(prev => ({ ...prev, image: data.url }));
                else if (target === 'videoThumbnail') setVideoForm(prev => ({ ...prev, thumbnail: data.url }));
                showStatus({ type: 'success', text: '✓ Image uploaded to Cloudinary!' });
            } else {
                showStatus({ type: 'error', text: 'Image upload failed.' });
            }
        } catch (err) {
            showStatus({ type: 'error', text: 'Error uploading image.' });
        } finally {
            setUploading(false);
        }
    };

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch('/api/admin/tools?action=upload-video', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (res.ok && data.url) {
                setVideoForm(prev => ({ ...prev, url: data.url }));
                showStatus({ type: 'success', text: '✓ Video uploaded to Cloudinary!' });
            } else {
                showStatus({ type: 'error', text: data.error || 'Video upload failed.' });
            }
        } catch (err) {
            showStatus({ type: 'error', text: 'Error uploading video.' });
        } finally {
            setUploading(false);
        }
    };

    const handleLogout = () => {
        document.cookie = 'admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        router.push('/login');
    };

    const toggleAll = () =>
        setSelectedEmails(selectedEmails.length === subscribers.length ? [] : subscribers.map(s => s.email));

    const toggleOne = (email: string) =>
        setSelectedEmails(prev =>
            prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEmails.length) { showStatus({ type: 'error', text: 'No recipients selected.' }); return; }
        setLoading(true); setStatus(null);
        try {
            const res = await fetch('/api/admin/tools?action=send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject, message, selectedEmails }),
            });
            if (res.ok) {
                showStatus({ type: 'success', text: `✓ Email sent to ${selectedEmails.length} subscriber(s)!` });
                setSubject(''); setMessage(''); setSelectedEmails([]);
            } else showStatus({ type: 'error', text: 'Failed to send. Try again.' });
        } catch { showStatus({ type: 'error', text: 'An error occurred.' }); }
        finally { setLoading(false); }
    };

    const allSelected = subscribers.length > 0 && selectedEmails.length === subscribers.length;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                * { box-sizing: border-box; }
                .admin-page { min-height: 100vh; background: #0F172A; font-family: 'Inter', sans-serif; color: #E2E8F0; }
                
                /* Navbar */
                .admin-nav {
                    background: rgba(255,255,255,0.03);
                    backdrop-filter: blur(16px);
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    display: flex; align-items: center;
                    justify-content: space-between;
                    padding: 0 28px; height: 66px;
                    position: sticky; top: 0; z-index: 50;
                }
                .nav-tabs-group { display: flex; gap: 6px; padding: 6px; background: rgba(255,255,255,0.05); border-radius: 12px; }
                .nav-tab {
                    display: flex; align-items: center; gap: 8px;
                    padding: 9px 20px; border-radius: 8px; border: none;
                    font-size: 14px; font-weight: 600; cursor: pointer;
                    font-family: 'Inter', sans-serif; transition: all 0.2s;
                    background: transparent; color: rgba(255,255,255,0.5);
                }
                .nav-tab.active {
                    background: linear-gradient(135deg, #FF7700, #FF9A00);
                    color: #fff;
                    box-shadow: 0 4px 16px rgba(255,119,0,0.35);
                }
                .nav-tab:not(.active):hover { background: rgba(255,255,255,0.08); color: #fff; }
                .logout-btn {
                    display: flex; align-items: center; gap: 8px;
                    padding: 9px 18px; border-radius: 10px;
                    border: 1px solid rgba(255,255,255,0.1);
                    background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.6);
                    font-size: 13px; font-weight: 600; cursor: pointer;
                    font-family: 'Inter', sans-serif; transition: all 0.2s;
                }
                .logout-btn:hover { background: rgba(255,0,0,0.1); border-color: rgba(255,80,80,0.3); color: #ff8080; }

                /* Body */
                .admin-body { max-width: 1240px; margin: 0 auto; padding: 32px 20px; }

                /* Stats */
                .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 28px; }
                .stat-box {
                    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 16px; padding: 20px 22px;
                    display: flex; align-items: center; gap: 16px;
                    transition: all 0.25s;
                }
                .stat-box:hover { background: rgba(255,255,255,0.07); transform: translateY(-3px); }
                .stat-ico { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
                .ico-blue  { background: rgba(99,179,237,0.12); color: #63B3ED; }
                .ico-orange{ background: rgba(255,119,0,0.12); color: #FF7700; }
                .ico-green { background: rgba(72,187,120,0.12); color: #48BB78; }
                .ico-purple{ background: rgba(159,122,234,0.12); color: #9F7AEA; }
                .stat-label { font-size: 11px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
                .stat-val { font-size: 24px; font-weight: 800; color: #fff; }

                /* Card */
                .card {
                    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 20px; padding: 28px;
                }
                .card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; flex-wrap: wrap; gap: 12px; }
                .card-title { font-size: 18px; font-weight: 700; color: #F1F5F9; margin: 0; }

                /* Buttons */
                .btn-primary {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 11px 22px; background: linear-gradient(135deg, #FF7700, #FF9A00);
                    border: none; border-radius: 10px; color: #fff; font-size: 14px;
                    font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif;
                    box-shadow: 0 4px 18px rgba(255,119,0,0.35); transition: all 0.2s;
                }
                .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,119,0,0.45); }
                .btn-primary:disabled { background: #334155; color: #64748B; box-shadow: none; cursor: not-allowed; transform: none; }
                .btn-primary.full { width: 100%; justify-content: center; padding: 14px; font-size: 15px; }
                .btn-outline {
                    padding: 8px 16px; background: transparent;
                    border: 1px solid rgba(255,255,255,0.12); border-radius: 8px;
                    color: rgba(255,255,255,0.5); font-size: 12px; font-weight: 600;
                    cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s;
                }
                .btn-outline:hover { background: rgba(255,255,255,0.06); color: #fff; border-color: rgba(255,255,255,0.2); }
                .btn-ghost {
                    padding: 8px 16px; background: rgba(255,119,0,0.12);
                    border: 1px solid rgba(255,119,0,0.25); border-radius: 8px;
                    color: #FF9A00; font-size: 12px; font-weight: 700;
                    cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s;
                }
                .btn-ghost:hover { background: rgba(255,119,0,0.2); }
                .btn-danger {
                    padding: 8px 12px; background: rgba(255,0,0,0.1);
                    border: 1px solid rgba(255,0,0,0.2); border-radius: 8px;
                    color: #ff8080; cursor: pointer; transition: all 0.2s;
                }
                .btn-danger:hover { background: rgba(255,0,0,0.2); }

                /* Table */
                .table-wrap { overflow-x: auto; margin: 0 -4px; padding: 0 4px; }
                table { width: 100%; border-collapse: collapse; min-width: 340px; }
                th { padding: 11px 14px; background: rgba(255,255,255,0.03); color: rgba(255,255,255,0.35); font-size: 11px; text-transform: uppercase; letter-spacing: 0.7px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.06); text-align: left; }
                td { padding: 14px 14px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 14px; }
                tr:last-child td { border-bottom: none; }
                tr:hover td { background: rgba(255,255,255,0.02); }
                .email-cell { color: #CBD5E1; font-weight: 500; }
                .date-cell { color: rgba(255,255,255,0.3); font-size: 13px; }
                .chk {
                    width: 18px; height: 18px; border-radius: 5px;
                    border: 1.5px solid rgba(255,255,255,0.2);
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; transition: all 0.2s; font-size: 9px;
                }
                .chk.on { background: #48BB78; border-color: #48BB78; color: #fff; }

                /* Form */
                .field-label { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.6); margin-bottom: 8px; display: block; }
                .field-input {
                    width: 100%; padding: 12px 14px;
                    background: rgba(255,255,255,0.05); border: 1.5px solid rgba(255,255,255,0.08);
                    border-radius: 10px; color: #E2E8F0; font-size: 14px;
                    font-family: 'Inter', sans-serif; transition: all 0.2s; resize: vertical;
                }
                .field-input::placeholder { color: rgba(255,255,255,0.2); }
                .field-input:focus { outline: none; border-color: rgba(255,119,0,0.5); background: rgba(255,255,255,0.07); box-shadow: 0 0 0 3px rgba(255,119,0,0.1); }

                /* Alert */
                .alert { padding: 14px 16px; border-radius: 10px; font-size: 14px; margin-bottom: 20px; display: flex; gap: 10px; animation: fadeIn 0.3s; }
                .alert-ok  { background: rgba(72,187,120,0.1); border: 1px solid rgba(72,187,120,0.25); color: #68D391; }
                .alert-err { background: rgba(252,129,129,0.1); border: 1px solid rgba(252,129,129,0.2); color: #FC8181; }
                @keyframes fadeIn { from { opacity:0; transform: translateY(-6px); } to { opacity:1; transform: translateY(0); } }

                /* Badge */
                .badge { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
                .badge-green { background: rgba(72,187,120,0.12); color: #68D391; }
                .badge-gray  { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.3); }

                /* Warning box */
                .warn-box { padding: 14px 16px; background: rgba(255,119,0,0.08); border: 1px solid rgba(255,119,0,0.2); border-radius: 10px; font-size: 14px; color: rgba(255,200,100,0.8); margin-bottom: 20px; }

                .blog-card { display: flex; gap: 20px; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 15px; margin-bottom: 16px; border: 1px solid rgba(255,255,255,0.05); }
                .blog-img { width: 120px; height: 80px; border-radius: 10px; object-fit: cover; background: #334155; }
                .blog-info { flex: 1; }
                .blog-title-text { font-size: 16px; font-weight: 700; color: #fff; margin: 0 0 4px 0; }
                .blog-meta { font-size: 12px; color: rgba(255,255,255,0.4); display: flex; gap: 12px; }

                @media (max-width: 1060px) {
                    .nav-tab span { display: none; }
                    .nav-tab { padding: 9px 14px; min-width: auto; }
                    .logout-btn span { display: none; }
                    .logout-btn { padding: 9px 14px; min-width: auto; }
                    .admin-nav > a img { height: 28px !important; }
                    .stats-row { grid-template-columns: repeat(3, 1fr); }
                    .admin-body { padding: 24px 18px; }
                }

                @media (max-width: 900px) {
                    .nav-tab span { display: none; }
                    .nav-tab { padding: 9px 14px; }
                    .logout-btn span { display: none; }
                    .logout-btn { padding: 9px 14px; }
                }

                @media (max-width: 640px) {
                    .admin-nav {
                        flex-direction: column; height: auto; padding: 14px 16px 10px; gap: 12px;
                    }
                    .admin-nav > a { display: flex; justify-content: center; }
                    .admin-nav > a img { height: 28px !important; }
                    .nav-tabs-group {
                        width: 100%; justify-content: center; gap: 4px;
                        padding: 5px 6px; border-radius: 14px;
                        background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
                    }
                    .nav-tab {
                        width: 38px; height: 38px; padding: 0; border-radius: 10px;
                        display: flex; align-items: center; justify-content: center;
                        font-size: 15px; flex-shrink: 0;
                    }
                    .nav-tab span { display: none; }
                    .nav-tab.active {
                        box-shadow: 0 3px 12px rgba(255,119,0,0.4);
                    }
                    .nav-tab:not(.active) {
                        color: rgba(255,255,255,0.35);
                    }
                    .nav-tab:not(.active):hover {
                        color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.08);
                    }
                    .logout-btn {
                        position: absolute; top: 14px; right: 16px;
                        width: 36px; height: 36px; padding: 0; border-radius: 10px;
                        display: flex; align-items: center; justify-content: center;
                        font-size: 14px; border-color: rgba(255,80,80,0.15);
                        background: rgba(255,50,50,0.06); color: #ff8080;
                    }
                    .logout-btn span { display: none; }
                    .admin-body { padding: 20px 14px; }
                    .card { padding: 18px; border-radius: 16px; }
                    .blog-card { flex-direction: column; }
                    .blog-img { width: 100%; height: 160px; }
                    .stats-row { grid-template-columns: repeat(2, 1fr); gap: 10px; }
                    .stat-box { padding: 14px 16px; border-radius: 12px; }
                    .stat-val { font-size: 20px; }
                    .stat-label { font-size: 10px; }
                    .stat-ico { width: 38px; height: 38px; font-size: 15px; border-radius: 10px; }
                    .card-title { font-size: 16px; }
                }

                @media (max-width: 400px) {
                    .admin-body { padding: 16px 10px; }
                    .card { padding: 15px; border-radius: 12px; }
                    .stats-row { grid-template-columns: 1fr; gap: 8px; }
                    .stat-box { padding: 12px 14px; }
                    .stat-val { font-size: 18px; }
                    .nav-tab { width: 34px; height: 34px; font-size: 13px; }
                    .nav-tabs-group { gap: 2px; padding: 4px; }
                    .logout-btn { width: 32px; height: 32px; font-size: 12px; }
                    .admin-nav > a img { height: 24px !important; }
                    .card-top { gap: 8px; margin-bottom: 15px; }
                    .card-title { font-size: 15px; }
                    .btn-primary { padding: 8px 14px; font-size: 13px; }
                    .table-wrap { margin: 0 -10px; padding: 0 10px; }
                    td { padding: 10px 8px; font-size: 13px; }
                    .field-input { padding: 10px; font-size: 13px; }
                    .field-label { font-size: 12px; }
                }
            `}</style>

            <div className="admin-page">
                {/* Navbar */}
                <nav className="admin-nav">
                    <Link href="/">
                        <img src="/Infinity-Logo-new.webp" alt="Logo" style={{ height: 34, filter: 'brightness(0) invert(1)' }} />
                    </Link>

                    <div className="nav-tabs-group">
                        {[
                            { key: 'subscribers', icon: 'fa-users', label: 'Subscribers' },
                            { key: 'blogs', icon: 'fa-newspaper-o', label: 'Blogs' },
                            { key: 'events', icon: 'fa-calendar', label: 'Events' },
                            { key: 'team', icon: 'fa-users', label: 'Team' },
                            { key: 'videos', icon: 'fa-play-circle', label: 'Videos' },
                            { key: 'services', icon: 'fa-briefcase', label: 'Services' },
                            { key: 'successStories', icon: 'fa-star', label: 'Stories' },
                            { key: 'faqs', icon: 'fa-question-circle', label: 'FAQs' },
                            { key: 'settings', icon: 'fa-cog', label: 'Settings' },
                        ].map(t => (
                            <button
                                key={t.key}
                                className={`nav-tab ${activeTab === t.key ? 'active' : ''}`}
                                onClick={() => setActiveTab(t.key as any)}
                            >
                                <i className={`fa ${t.icon}`}></i>
                                <span>{t.label}</span>
                            </button>
                        ))}
                    </div>

                    <button className="logout-btn" onClick={handleLogout}>
                        <i className="fa fa-sign-out"></i>
                        <span>Sign Out</span>
                    </button>
                </nav>

                {/* Body */}
                <div className="admin-body">
                    {/* Status Alert */}
                    {status && (
                        <div className={`alert ${status.type === 'success' ? 'alert-ok' : 'alert-err'}`} style={{ maxWidth: 1240, margin: '0 auto 24px auto' }}>
                            {status.text}
                            <button onClick={() => setStatus(null)} style={{ background: 'none', border: 'none', color: 'inherit', marginLeft: 'auto', cursor: 'pointer' }}>×</button>
                        </div>
                    )}

                    {/* Stats */}
                    <div className="stats-row">
                        {[
                            { ico: 'fa-users', cls: 'ico-blue', label: 'Subscribers', val: fetching ? '…' : subscribers.length },
                            { ico: 'fa-newspaper-o', cls: 'ico-purple', label: 'Total Blogs', val: blogs.length },
                            { ico: 'fa-calendar', cls: 'ico-green', label: 'Total Events', val: events.length },
                            { ico: 'fa-play-circle', cls: 'ico-blue', label: 'Total Videos', val: videos.length },
                            { ico: 'fa-users', cls: 'ico-orange', label: 'Team Members', val: team.length },
                            { ico: 'fa-briefcase', cls: 'ico-blue', label: 'Services', val: services.length },
                            { ico: 'fa-star', cls: 'ico-purple', label: 'Success Stories', val: successStories.length },
                            { ico: 'fa-question-circle', cls: 'ico-green', label: 'FAQs', val: faqs.length },
                        ].map((s, i) => (
                            <div className="stat-box" key={i}>
                                <div className={`stat-ico ${s.cls}`}><i className={`fa ${s.ico}`}></i></div>
                                <div>
                                    <div className="stat-label">{s.label}</div>
                                    <div className="stat-val">{s.val}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tab: Subscribers */}
                    {activeTab === 'subscribers' && (
                        <div className="card">
                            <div className="card-top">
                                <h2 className="card-title">Subscriber List</h2>
                                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                                    <span className={`badge ${selectedEmails.length > 0 ? 'badge-green' : 'badge-gray'}`}>
                                        {selectedEmails.length} selected
                                    </span>
                                    <button className="btn-outline" onClick={toggleAll}>
                                        {allSelected ? 'Deselect All' : 'Select All'}
                                    </button>
                                    {selectedEmails.length > 0 && (
                                        <button className="btn-ghost" onClick={() => setActiveTab('compose')}>
                                            Compose Email →
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th style={{ width: 40 }}>
                                                <div className={`chk ${allSelected ? 'on' : ''}`} onClick={toggleAll}>
                                                    {allSelected && <i className="fa fa-check"></i>}
                                                </div>
                                            </th>
                                            <th>Email Address</th>
                                            <th>Joined Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fetching ? (
                                            <tr><td colSpan={3} style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.2)' }}>
                                                <i className="fa fa-spinner fa-spin"></i> Loading...
                                            </td></tr>
                                        ) : subscribers.length === 0 ? (
                                            <tr><td colSpan={3} style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.2)' }}>No subscribers yet.</td></tr>
                                        ) : subscribers.map(sub => {
                                            const on = selectedEmails.includes(sub.email);
                                            return (
                                                <tr key={sub.id}>
                                                    <td>
                                                        <div className={`chk ${on ? 'on' : ''}`} onClick={() => toggleOne(sub.email)}>
                                                            {on && <i className="fa fa-check"></i>}
                                                        </div>
                                                    </td>
                                                    <td className="email-cell">{sub.email}</td>
                                                    <td className="date-cell">{sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : 'N/A'}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Tab: Settings */}
                    {activeTab === 'settings' && (
                        <div className="card" style={{ maxWidth: 800, margin: '0 auto' }}>
                            <div className="card-top">
                                <div>
                                    <h2 className="card-title"><i className="fa fa-cog" style={{ marginRight: 10, color: '#FF7700' }}></i>Site Configuration</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, margin: '6px 0 0 0' }}>
                                        Manage your website&apos;s contact information displayed across all pages
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSaveSettings}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 20 }}>
                                    <div>
                                        <label className="field-label"><i className="fa fa-envelope" style={{ marginRight: 6, color: '#FF7700', fontSize: 12 }}></i>Contact Email</label>
                                        <input
                                            className="field-input"
                                            type="email"
                                            value={settingsForm.email}
                                            onChange={e => setSettingsForm({ ...settingsForm, email: e.target.value })}
                                            placeholder="Infinityconsultantsfsd@gmail.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="field-label"><i className="fa fa-phone" style={{ marginRight: 6, color: '#FF7700', fontSize: 12 }}></i>Phone Number</label>
                                        <input
                                            className="field-input"
                                            type="tel"
                                            value={settingsForm.phone}
                                            onChange={e => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                                            placeholder="+92 326 4571906"
                                            required
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: 28 }}>
                                    <label className="field-label"><i className="fa fa-map-marker" style={{ marginRight: 6, color: '#FF7700', fontSize: 12 }}></i>Physical Location</label>
                                    <input
                                        className="field-input"
                                        value={settingsForm.location}
                                        onChange={e => setSettingsForm({ ...settingsForm, location: e.target.value })}
                                        placeholder="Mazzanine floor, Media com plaza, Office No. 63, 64 Kohinoor Rd, Faisalabad"
                                        required
                                    />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                    <button className="btn-primary" type="submit" disabled={loading}>
                                        {loading ? <><i className="fa fa-spinner fa-spin"></i> Saving...</> : <><i className="fa fa-save"></i> Save Settings</>}
                                    </button>
                                    <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>
                                        Changes will be reflected across the website
                                    </span>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Tab: Compose */}
                    {activeTab === 'compose' && (
                        <div className="card" style={{ maxWidth: 700, margin: '0 auto' }}>
                            <div className="card-top">
                                <h2 className="card-title">Compose Email</h2>
                                <span className={`badge ${selectedEmails.length > 0 ? 'badge-green' : 'badge-gray'}`}>
                                    {selectedEmails.length} recipient(s)
                                </span>
                            </div>

                            {selectedEmails.length === 0 && (
                                <div className="warn-box">
                                    <i className="fa fa-exclamation-triangle" style={{ marginRight: 8 }}></i>
                                    No recipients selected.{' '}
                                    <button onClick={() => setActiveTab('subscribers')} style={{ background: 'none', border: 'none', color: '#FF9A00', fontWeight: 700, cursor: 'pointer' }}>
                                        Select from Subscribers →
                                    </button>
                                </div>
                            )}

                            <form onSubmit={handleSend}>
                                <div style={{ marginBottom: 18 }}>
                                    <label className="field-label">Subject</label>
                                    <input className="field-input" type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Enter email subject..." required />
                                </div>
                                <div style={{ marginBottom: 24 }}>
                                    <label className="field-label">Message</label>
                                    <textarea className="field-input" rows={10} value={message} onChange={e => setMessage(e.target.value)} placeholder="Write your message here..." required />
                                </div>
                                <button type="submit" className="btn-primary full" disabled={loading || selectedEmails.length === 0}>
                                    {loading
                                        ? <><i className="fa fa-spinner fa-spin"></i> Sending...</>
                                        : <><i className="fa fa-paper-plane"></i> Send Newsletter</>
                                    }
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Tab: Blogs */}
                    {activeTab === 'blogs' && (
                        <div className="card">
                            <div className="card-top">
                                <h2 className="card-title">{isBlogFormOpen ? (editingBlog ? 'Edit Blog' : 'Create New Blog') : 'Manage Blogs'}</h2>
                                <button className="btn-primary" onClick={() => {
                                    if (isBlogFormOpen) {
                                        setIsBlogFormOpen(false);
                                        setEditingBlog(null);
                                    } else {
                                        setBlogForm({ title: '', description: '', content: '', image: '', category: '', date: '' });
                                        setIsBlogFormOpen(true);
                                    }
                                }}>
                                    {isBlogFormOpen ? '← Back to List' : <><i className="fa fa-plus"></i> New Blog</>}
                                </button>
                            </div>

                            {isBlogFormOpen ? (
                                <form onSubmit={handleSaveBlog} style={{ maxWidth: 800, margin: '0 auto' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                                        <div>
                                            <label className="field-label">Blog Title</label>
                                            <input className="field-input" value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} placeholder="Title of the blog..." required />
                                        </div>
                                        <div>
                                            <label className="field-label">Category</label>
                                            <input className="field-input" value={blogForm.category} onChange={e => setBlogForm({ ...blogForm, category: e.target.value })} placeholder="e.g. Education, Business" required />
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <label className="field-label">Short Description</label>
                                        <textarea className="field-input" rows={3} value={blogForm.description} onChange={e => setBlogForm({ ...blogForm, description: e.target.value })} placeholder="A brief summary..." required />
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <label className="field-label">Full Content (HTML allowed)</label>
                                        <textarea className="field-input" rows={12} value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} placeholder="The main body of the blog..." />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 30 }}>
                                        <div>
                                            <label className="field-label">Blog Image</label>
                                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                                <label style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                                    padding: '10px 18px', background: 'rgba(255,119,0,0.12)',
                                                    border: '1px dashed rgba(255,119,0,0.4)', borderRadius: 10,
                                                    color: '#FF9A00', fontWeight: 600, cursor: 'pointer', fontSize: 13,
                                                    transition: 'all 0.2s'
                                                }}>
                                                    <i className={`fa ${uploading ? 'fa-spinner fa-spin' : (blogForm.image ? 'fa-refresh' : 'fa-cloud-upload')}`}></i>
                                                    {uploading ? 'Uploading...' : (blogForm.image ? 'Change Image' : 'Upload Image')}
                                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'blog')} style={{ display: 'none' }} />
                                                </label>
                                                {blogForm.image && (
                                                    <img src={blogForm.image} alt="Preview" style={{ width: 60, height: 40, borderRadius: 8, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
                                                )}
                                            </div>
                                            {blogForm.image && (
                                                <input className="field-input" style={{ marginTop: 8, fontSize: 12 }} value={blogForm.image} onChange={e => setBlogForm({ ...blogForm, image: e.target.value })} placeholder="Or paste URL directly..." />
                                            )}
                                        </div>
                                        <div>
                                            <label className="field-label">Display Date (optional)</label>
                                            <input className="field-input" value={blogForm.date} onChange={e => setBlogForm({ ...blogForm, date: e.target.value })} placeholder="e.g. 15 Jan (leave empty for today)" />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn-primary full" disabled={loading}>
                                        {loading ? <i className="fa fa-spinner fa-spin"></i> : <i className="fa fa-save"></i>}
                                        {editingBlog ? ' Update Blog Post' : ' Publish Blog Post'}
                                    </button>
                                </form>
                            ) : (
                                <div className="blog-list">
                                    {blogs.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.2)' }}>
                                            <i className="fa fa-newspaper-o fa-3x mb-3"></i>
                                            <p>No blogs published yet.</p>
                                        </div>
                                    ) : blogs.map(blog => (
                                        <div key={blog.id} className="blog-card">
                                            <img src={blog.image} className="blog-img" alt="" />
                                            <div className="blog-info">
                                                <h3 className="blog-title-text">{blog.title}</h3>
                                                <div className="blog-meta">
                                                    <span><i className="fa fa-calendar"></i> {blog.date}</span>
                                                    <span><i className="fa fa-tag"></i> {blog.category}</span>
                                                </div>
                                                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '10px 0' }}>
                                                    {blog.description.substring(0, 120)}...
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                                <button className="btn-outline" onClick={() => {
                                                    setEditingBlog(blog);
                                                    setBlogForm({
                                                        title: blog.title,
                                                        description: blog.description,
                                                        content: blog.content || '',
                                                        image: blog.image,
                                                        category: blog.category,
                                                        date: blog.date
                                                    });
                                                    setIsBlogFormOpen(true);
                                                }}>
                                                    <i className="fa fa-edit"></i> Edit
                                                </button>
                                                <button className="btn-danger" onClick={() => deleteBlog(blog.id)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tab: Events */}
                    {activeTab === 'events' && (
                        <div className="card">
                            <div className="card-top">
                                <h2 className="card-title">{showEventForm ? (editingEvent ? 'Edit Event' : 'Create New Event') : 'Manage Events'}</h2>
                                <button className="btn-primary" onClick={() => {
                                    if (showEventForm) {
                                        setShowEventForm(false);
                                        setEditingEvent(null);
                                    } else {
                                        setEventForm({ title: '', description: '', image: '', time: '', location: '', date: '', dayLabel: '', dayId: '', color: 'bg-light', textWhite: false });
                                        setShowEventForm(true);
                                    }
                                }}>
                                    {showEventForm ? '← Back to List' : <><i className="fa fa-plus"></i> New Event</>}
                                </button>
                            </div>

                            {showEventForm ? (
                                <form onSubmit={handleSaveEvent} style={{ maxWidth: 800, margin: '0 auto' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                                        <div>
                                            <label className="field-label">Event Title</label>
                                            <input className="field-input" value={eventForm.title} onChange={e => setEventForm({ ...eventForm, title: e.target.value })} placeholder="Title of the event..." required />
                                        </div>
                                        <div>
                                            <label className="field-label">Location</label>
                                            <input className="field-input" value={eventForm.location} onChange={e => setEventForm({ ...eventForm, location: e.target.value })} placeholder="e.g. Serena Hotel, Faisalabad" required />
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                                        <div>
                                            <label className="field-label">Time Range</label>
                                            <input className="field-input" value={eventForm.time} onChange={e => setEventForm({ ...eventForm, time: e.target.value })} placeholder="e.g. 11:00 AM - 05:00 PM" required />
                                        </div>
                                        <div>
                                            <label className="field-label">Day/Date Label</label>
                                            <input className="field-input" value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} placeholder="e.g. 15 March, 2025" required />
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                                        <div>
                                            <label className="field-label">Day Name (for tab filtering)</label>
                                            <input className="field-input" value={eventForm.dayId} onChange={e => setEventForm({ ...eventForm, dayId: e.target.value })} placeholder="e.g. day1, day2" required />
                                        </div>
                                        <div>
                                            <label className="field-label">Day Subtitle</label>
                                            <input className="field-input" value={eventForm.dayLabel} onChange={e => setEventForm({ ...eventForm, dayLabel: e.target.value })} placeholder="e.g. DAY 1" required />
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <label className="field-label">Description</label>
                                        <textarea className="field-input" rows={4} value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })} placeholder="Details about the event..." required />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 30 }}>
                                        <div>
                                            <label className="field-label">Event Image</label>
                                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                                <label style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                                    padding: '10px 18px', background: 'rgba(255,119,0,0.12)',
                                                    border: '1px dashed rgba(255,119,0,0.4)', borderRadius: 10,
                                                    color: '#FF9A00', fontWeight: 600, cursor: 'pointer', fontSize: 13,
                                                    transition: 'all 0.2s'
                                                }}>
                                                    <i className={`fa ${uploading ? 'fa-spinner fa-spin' : (eventForm.image ? 'fa-refresh' : 'fa-cloud-upload')}`}></i>
                                                    {uploading ? 'Uploading...' : (eventForm.image ? 'Change Image' : 'Upload Image')}
                                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'event')} style={{ display: 'none' }} />
                                                </label>
                                                {eventForm.image && (
                                                    <img src={eventForm.image} alt="Preview" style={{ width: 60, height: 40, borderRadius: 8, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
                                                )}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                                            <div style={{ flex: 1 }}>
                                                <label className="field-label">Background Style</label>
                                                <select className="field-input" value={eventForm.color || ''} onChange={e => setEventForm({ ...eventForm, color: e.target.value })}>
                                                    <option value="bg-light">Light (Gray)</option>
                                                    <option value="bg_green">Green (Featured)</option>
                                                </select>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24 }}>
                                                <div className={`chk ${eventForm.textWhite ? 'on' : ''}`} onClick={() => setEventForm({ ...eventForm, textWhite: !eventForm.textWhite })}>
                                                    {eventForm.textWhite && <i className="fa fa-check"></i>}
                                                </div>
                                                <span className="field-label" style={{ marginBottom: 0 }}>White Text</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn-primary full" disabled={loading}>
                                        {loading ? <i className="fa fa-spinner fa-spin"></i> : <i className="fa fa-save"></i>}
                                        {editingEvent ? ' Update Event' : ' Create Event'}
                                    </button>
                                </form>
                            ) : (
                                <div className="event-list">
                                    {events.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.2)' }}>
                                            <i className="fa fa-calendar fa-3x mb-3"></i>
                                            <p>No events scheduled yet.</p>
                                        </div>
                                    ) : events.map(event => (
                                        <div key={event.id} className="blog-card">
                                            <img src={event.image || '/assets/images/placeholder.jpg'} className="blog-img" alt="" />
                                            <div className="blog-info">
                                                <h3 className="blog-title-text">{event.title}</h3>
                                                <div className="blog-meta">
                                                    <span><i className="fa fa-calendar"></i> {event.date}</span>
                                                    <span><i className="fa fa-clock-o"></i> {event.time}</span>
                                                    <span><i className="fa fa-map-marker"></i> {event.location}</span>
                                                </div>
                                                <div className="blog-meta" style={{ marginTop: 4 }}>
                                                    <span className="badge badge-gray">{event.dayId}</span>
                                                    <span className="badge badge-gray">{event.dayLabel}</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                                <button className="btn-outline" onClick={() => {
                                                    setEditingEvent(event);
                                                    setEventForm({
                                                        title: event.title,
                                                        description: event.description,
                                                        image: event.image,
                                                        time: event.time,
                                                        location: event.location,
                                                        date: event.date,
                                                        dayLabel: event.dayLabel,
                                                        dayId: event.dayId,
                                                        color: event.color || 'bg-light',
                                                        textWhite: event.textWhite
                                                    });
                                                    setShowEventForm(true);
                                                }}>
                                                    <i className="fa fa-edit"></i> Edit
                                                </button>
                                                <button className="btn-danger" onClick={() => deleteEvent(event.id)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    {/* Tab: Team */}
                    {activeTab === 'team' && (
                        <div className="card">
                            <div className="card-top">
                                <h2 className="card-title">{showTeamForm ? (editingTeam ? 'Edit Team Member' : 'Add Team Member') : 'Manage Our Team'}</h2>
                                <button className="btn-primary" onClick={() => {
                                    if (showTeamForm) {
                                        setShowTeamForm(false);
                                        setEditingTeam(null);
                                    } else {
                                        setTeamForm({ name: '', role: '', description: '', image: '', twitter: '', instagram: '', linkedin: '' });
                                        setShowTeamForm(true);
                                    }
                                }}>
                                    {showTeamForm ? '← Back to List' : <><i className="fa fa-plus"></i> Add Member</>}
                                </button>
                            </div>

                            {showTeamForm ? (
                                <form onSubmit={handleSaveTeam} style={{ maxWidth: 800, margin: '0 auto' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                                        <div>
                                            <label className="field-label">Name</label>
                                            <input className="field-input" value={teamForm.name} onChange={e => setTeamForm({ ...teamForm, name: e.target.value })} placeholder="Full name..." required />
                                        </div>
                                        <div>
                                            <label className="field-label">Role</label>
                                            <input className="field-input" value={teamForm.role} onChange={e => setTeamForm({ ...teamForm, role: e.target.value })} placeholder="e.g. Director, Manager" required />
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <label className="field-label">Description</label>
                                        <textarea className="field-input" rows={4} value={teamForm.description} onChange={e => setTeamForm({ ...teamForm, description: e.target.value })} placeholder="Brief bio..." required />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 15, marginBottom: 20 }}>
                                        <div>
                                            <label className="field-label">Twitter</label>
                                            <input className="field-input" value={teamForm.twitter || ''} onChange={e => setTeamForm({ ...teamForm, twitter: e.target.value })} placeholder="Profile URL" />
                                        </div>
                                        <div>
                                            <label className="field-label">Instagram</label>
                                            <input className="field-input" value={teamForm.instagram || ''} onChange={e => setTeamForm({ ...teamForm, instagram: e.target.value })} placeholder="Profile URL" />
                                        </div>
                                        <div>
                                            <label className="field-label">LinkedIn</label>
                                            <input className="field-input" value={teamForm.linkedin || ''} onChange={e => setTeamForm({ ...teamForm, linkedin: e.target.value })} placeholder="Profile URL" />
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: 30 }}>
                                        <label className="field-label">Member Image</label>
                                        <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                                            <label style={{
                                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                                padding: '10px 18px', background: 'rgba(255,119,0,0.12)',
                                                border: '1px dashed rgba(255,119,0,0.4)', borderRadius: 10,
                                                color: '#FF9A00', fontWeight: 600, cursor: 'pointer', fontSize: 13,
                                                transition: 'all 0.2s'
                                            }}>
                                                <i className={`fa ${uploading ? 'fa-spinner fa-spin' : (teamForm.image ? 'fa-refresh' : 'fa-cloud-upload')}`}></i>
                                                {uploading ? 'Uploading...' : (teamForm.image ? 'Change Photo' : 'Upload Photo')}
                                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'team')} style={{ display: 'none' }} />
                                            </label>
                                            {teamForm.image && (
                                                <img src={teamForm.image} alt="Preview" style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: '2px solid #FF7700' }} />
                                            )}
                                        </div>
                                    </div>
                                    <button type="submit" className="btn-primary full" disabled={loading}>
                                        {loading ? <i className="fa fa-spinner fa-spin"></i> : <i className="fa fa-save"></i>}
                                        {editingTeam ? ' Update Member' : ' Add Member'}
                                    </button>
                                </form>
                            ) : (
                                <div className="event-list">
                                    {team.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.2)' }}>
                                            <i className="fa fa-users fa-3x mb-3"></i>
                                            <p>No team members added yet.</p>
                                        </div>
                                    ) : team.map(member => (
                                        <div key={member.id} className="blog-card">
                                            <img src={member.image} className="blog-img" alt="" style={{ borderRadius: '50%', width: 80, height: 80 }} />
                                            <div className="blog-info">
                                                <h3 className="blog-title-text">{member.name}</h3>
                                                <div className="blog-meta">
                                                    <span><i className="fa fa-id-badge"></i> {member.role}</span>
                                                </div>
                                                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '10px 0' }}>
                                                    {member.description.substring(0, 100)}...
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                                <button className="btn-outline" onClick={() => {
                                                    setEditingTeam(member);
                                                    setTeamForm({
                                                        name: member.name,
                                                        role: member.role,
                                                        description: member.description,
                                                        image: member.image,
                                                        twitter: member.twitter || '',
                                                        instagram: member.instagram || '',
                                                        linkedin: member.linkedin || ''
                                                    });
                                                    setShowTeamForm(true);
                                                }}>
                                                    <i className="fa fa-edit"></i>
                                                </button>
                                                <button className="btn-danger" onClick={() => deleteTeam(member.id)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tab: Success Stories */}
                    {activeTab === 'successStories' && (
                        <div className="card">
                            <div className="card-top">
                                <h2 className="card-title">{showSuccessStoryForm ? (editingSuccessStory ? 'Edit Success Story' : 'Add Success Story') : 'Manage Success Stories'}</h2>
                                <button className="btn-primary" onClick={() => {
                                    if (showSuccessStoryForm) {
                                        setShowSuccessStoryForm(false);
                                        setEditingSuccessStory(null);
                                    } else {
                                        setSuccessStoryForm({ name: '', feedback: '', image: '', date: '' });
                                        setShowSuccessStoryForm(true);
                                    }
                                }}>
                                    {showSuccessStoryForm ? '← Back to List' : <><i className="fa fa-plus"></i> Add Story</>}
                                </button>
                            </div>

                            {showSuccessStoryForm ? (
                                <form onSubmit={handleSaveSuccessStory} style={{ maxWidth: 800, margin: '0 auto' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                                        <div>
                                            <label className="field-label">Student Name</label>
                                            <input className="field-input" value={successStoryForm.name} onChange={e => setSuccessStoryForm({ ...successStoryForm, name: e.target.value })} placeholder="Student Name..." required />
                                        </div>
                                        <div>
                                            <label className="field-label">Date (Optional)</label>
                                            <input className="field-input" value={successStoryForm.date || ''} onChange={e => setSuccessStoryForm({ ...successStoryForm, date: e.target.value })} placeholder="e.g. July 2022" />
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <label className="field-label">Feedback / Story</label>
                                        <textarea className="field-input" rows={4} value={successStoryForm.feedback} onChange={e => setSuccessStoryForm({ ...successStoryForm, feedback: e.target.value })} placeholder="Student's feedback..." required />
                                    </div>
                                    <div style={{ marginBottom: 30 }}>
                                        <label className="field-label">Student Image</label>
                                        <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                                            <label style={{
                                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                                padding: '10px 18px', background: 'rgba(255,119,0,0.12)',
                                                border: '1px dashed rgba(255,119,0,0.4)', borderRadius: 10,
                                                color: '#FF9A00', fontWeight: 600, cursor: 'pointer', fontSize: 13,
                                                transition: 'all 0.2s'
                                            }}>
                                                <i className={`fa ${uploading ? 'fa-spinner fa-spin' : (successStoryForm.image ? 'fa-refresh' : 'fa-cloud-upload')}`}></i>
                                                {uploading ? 'Uploading...' : (successStoryForm.image ? 'Change Photo' : 'Upload Photo')}
                                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'successStory')} style={{ display: 'none' }} />
                                            </label>
                                            {successStoryForm.image && (
                                                <img src={successStoryForm.image} alt="Preview" style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: '2px solid #FF7700' }} />
                                            )}
                                        </div>
                                    </div>
                                    <button type="submit" className="btn-primary full" disabled={loading}>
                                        {loading ? <i className="fa fa-spinner fa-spin"></i> : <i className="fa fa-save"></i>}
                                        {editingSuccessStory ? ' Update Story' : ' Add Story'}
                                    </button>
                                </form>
                            ) : (
                                <div className="event-list">
                                    {successStories.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.2)' }}>
                                            <i className="fa fa-star fa-3x mb-3"></i>
                                            <p>No success stories added yet.</p>
                                        </div>
                                    ) : successStories.map(story => (
                                        <div key={story.id} className="blog-card">
                                            <img src={story.image} className="blog-img" alt="" style={{ borderRadius: '50%', width: 80, height: 80 }} />
                                            <div className="blog-info">
                                                <h3 className="blog-title-text">{story.name}</h3>
                                                <div className="blog-meta">
                                                    <span><i className="fa fa-calendar"></i> {story.date}</span>
                                                </div>
                                                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '10px 0' }}>
                                                    "{story.feedback.substring(0, 100)}..."
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                                <button className="btn-outline" onClick={() => {
                                                    setEditingSuccessStory(story);
                                                    setSuccessStoryForm({
                                                        name: story.name,
                                                        feedback: story.feedback,
                                                        image: story.image,
                                                        date: story.date || ''
                                                    });
                                                    setShowSuccessStoryForm(true);
                                                }}>
                                                    <i className="fa fa-edit"></i>
                                                </button>
                                                <button className="btn-danger" onClick={() => deleteSuccessStory(story.id)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tab: Services */}
                    {activeTab === 'services' && (
                        <div className="card">
                            <div className="card-top">
                                <h2 className="card-title">{showServiceForm ? (editingService ? 'Edit Service' : 'Add New Service') : 'Manage Services'}</h2>
                                <button className="btn-primary" onClick={() => {
                                    if (showServiceForm) {
                                        setShowServiceForm(false);
                                        setEditingService(null);
                                    } else {
                                        setServiceForm({ title: '', description: '', image: '', icon: 'globe' });
                                        setShowServiceForm(true);
                                    }
                                }}>
                                    {showServiceForm ? '← Back to List' : <><i className="fa fa-plus"></i> Add Service</>}
                                </button>
                            </div>

                            {showServiceForm ? (
                                <form onSubmit={handleSaveService} style={{ maxWidth: 800, margin: '0 auto' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                                        <div>
                                            <label className="field-label">Service Title</label>
                                            <input className="field-input" value={serviceForm.title} onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })} placeholder="Title..." required />
                                        </div>
                                        <div>
                                            <label className="field-label">FontAwesome Icon</label>
                                            <input className="field-input" value={serviceForm.icon || ''} onChange={e => setServiceForm({ ...serviceForm, icon: e.target.value })} placeholder="e.g. globe, plane, university" />
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <label className="field-label">Description</label>
                                        <textarea className="field-input" rows={4} value={serviceForm.description} onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })} placeholder="Service details..." required />
                                    </div>
                                    <div style={{ marginBottom: 30 }}>
                                        <label className="field-label">Service Image</label>
                                        <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                                            <label style={{
                                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                                padding: '10px 18px', background: 'rgba(255,119,0,0.12)',
                                                border: '1px dashed rgba(255,119,0,0.4)', borderRadius: 10,
                                                color: '#FF9A00', fontWeight: 600, cursor: 'pointer', fontSize: 13,
                                                transition: 'all 0.2s'
                                            }}>
                                                <i className={`fa ${uploading ? 'fa-spinner fa-spin' : (serviceForm.image ? 'fa-refresh' : 'fa-cloud-upload')}`}></i>
                                                {uploading ? 'Uploading...' : (serviceForm.image ? 'Change Image' : 'Upload Image')}
                                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'service')} style={{ display: 'none' }} />
                                            </label>
                                            {serviceForm.image && (
                                                <img src={serviceForm.image} alt="Preview" style={{ width: 100, height: 60, borderRadius: 10, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
                                            )}
                                        </div>
                                    </div>
                                    <button type="submit" className="btn-primary full" disabled={loading}>
                                        {loading ? <i className="fa fa-spinner fa-spin"></i> : <i className="fa fa-save"></i>}
                                        {editingService ? ' Update Service' : ' Create Service'}
                                    </button>
                                </form>
                            ) : (
                                <div className="event-list">
                                    {services.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.2)' }}>
                                            <i className="fa fa-briefcase fa-3x mb-3"></i>
                                            <p>No services added yet.</p>
                                        </div>
                                    ) : services.map(srv => (
                                        <div key={srv.id} className="blog-card">
                                            <img src={srv.image} className="blog-img" alt="" />
                                            <div className="blog-info">
                                                <h3 className="blog-title-text"><i className={`fa fa-${srv.icon}`} style={{ marginRight: 10, color: '#FF7700' }}></i> {srv.title}</h3>
                                                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '10px 0' }}>
                                                    {srv.description.substring(0, 100)}...
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                                <button className="btn-outline" onClick={() => {
                                                    setEditingService(srv);
                                                    setServiceForm({
                                                        title: srv.title,
                                                        description: srv.description,
                                                        image: srv.image,
                                                        icon: srv.icon || 'globe'
                                                    });
                                                    setShowServiceForm(true);
                                                }}>
                                                    <i className="fa fa-edit"></i>
                                                </button>
                                                <button className="btn-danger" onClick={() => deleteService(srv.id)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tab: FAQs */}
                    {activeTab === 'faqs' && (
                        <div className="card">
                            <div className="card-top">
                                <h2 className="card-title">{showFaqForm ? (editingFaq ? 'Edit FAQ' : 'Add FAQ') : 'Manage FAQs'}</h2>
                                <button className="btn-primary" onClick={() => {
                                    if (showFaqForm) {
                                        setShowFaqForm(false);
                                        setEditingFaq(null);
                                    } else {
                                        setFaqForm({ question: '', answer: '' });
                                        setShowFaqForm(true);
                                    }
                                }}>
                                    {showFaqForm ? '← Back to List' : <><i className="fa fa-plus"></i> Add FAQ</>}
                                </button>
                            </div>

                            {showFaqForm ? (
                                <form onSubmit={handleSaveFaq} style={{ maxWidth: 800, margin: '0 auto' }}>
                                    <div style={{ marginBottom: 20 }}>
                                        <label className="field-label">Question</label>
                                        <input className="field-input" value={faqForm.question} onChange={e => setFaqForm({ ...faqForm, question: e.target.value })} placeholder="Frequently asked question..." required />
                                    </div>
                                    <div style={{ marginBottom: 30 }}>
                                        <label className="field-label">Answer</label>
                                        <textarea className="field-input" rows={6} value={faqForm.answer} onChange={e => setFaqForm({ ...faqForm, answer: e.target.value })} placeholder="Answer to the question..." required />
                                    </div>
                                    <button type="submit" className="btn-primary full" disabled={loading}>
                                        {loading ? <i className="fa fa-spinner fa-spin"></i> : <i className="fa fa-save"></i>}
                                        {editingFaq ? ' Update FAQ' : ' Add FAQ'}
                                    </button>
                                </form>
                            ) : (
                                <div className="event-list">
                                    {faqs.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.2)' }}>
                                            <i className="fa fa-question-circle fa-3x mb-3"></i>
                                            <p>No FAQs added yet.</p>
                                        </div>
                                    ) : faqs.map(faq => (
                                        <div key={faq.id} className="blog-card" style={{ flexDirection: 'column' }}>
                                            <div className="blog-info">
                                                <h3 className="blog-title-text" style={{ fontSize: 18, marginBottom: 12 }}><i className="fa fa-question-circle" style={{ color: '#FF7700', marginRight: 8 }}></i>{faq.question}</h3>
                                                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6 }}>
                                                    {faq.answer}
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 15, paddingTop: 15, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                                <button className="btn-outline" onClick={() => {
                                                    setEditingFaq(faq);
                                                    setFaqForm({
                                                        question: faq.question,
                                                        answer: faq.answer
                                                    });
                                                    setShowFaqForm(true);
                                                }}>
                                                    <i className="fa fa-edit"></i> Edit
                                                </button>
                                                <button className="btn-danger" onClick={() => deleteFaq(faq.id)}>
                                                    <i className="fa fa-trash"></i> Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tab: Videos */}
                    {activeTab === 'videos' && (
                        <div className="card">
                            <div className="card-top">
                                <h2 className="card-title">{showVideoForm ? (editingVideo ? 'Edit Video' : 'Upload Video') : 'Manage Videos'}</h2>
                                <button className="btn-primary" onClick={() => {
                                    if (showVideoForm) {
                                        setShowVideoForm(false);
                                        setEditingVideo(null);
                                    } else {
                                        setVideoForm({ title: '', url: '', thumbnail: '', country: '' });
                                        setShowVideoForm(true);
                                    }
                                }}>
                                    {showVideoForm ? '← Back to List' : <><i className="fa fa-plus"></i> Upload Video</>}
                                </button>
                            </div>

                            {showVideoForm ? (
                                <form onSubmit={handleSaveVideo} style={{ maxWidth: 800, margin: '0 auto' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                                        <div>
                                            <label className="field-label">Video Title</label>
                                            <input className="field-input" value={videoForm.title} onChange={e => setVideoForm({ ...videoForm, title: e.target.value })} placeholder="Awesome Video Title..." required />
                                        </div>
                                        <div>
                                            <label className="field-label">Country (ex. FRANCE)</label>
                                            <input className="field-input" value={videoForm.country} onChange={e => setVideoForm({ ...videoForm, country: e.target.value })} placeholder="e.g. FRANCE" />
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 30 }}>
                                        <div>
                                            <label className="field-label">Video File (.mp4, .webm)</label>
                                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                                <label style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                                    padding: '10px 18px', background: 'rgba(255,119,0,0.12)',
                                                    border: '1px dashed rgba(255,119,0,0.4)', borderRadius: 10,
                                                    color: '#FF9A00', fontWeight: 600, cursor: 'pointer', fontSize: 13,
                                                    transition: 'all 0.2s'
                                                }}>
                                                    <i className={`fa ${uploading ? 'fa-spinner fa-spin' : (videoForm.url ? 'fa-refresh' : 'fa-video-camera')}`}></i>
                                                    {uploading ? 'Uploading...' : (videoForm.url ? 'Change Video' : 'Upload Video')}
                                                    <input type="file" accept="video/mp4,video/webm" onChange={handleVideoUpload} style={{ display: 'none' }} />
                                                </label>
                                                {videoForm.url && (
                                                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>✓ Video Ready</span>
                                                )}
                                            </div>
                                            {videoForm.url && (
                                                <input className="field-input" style={{ marginTop: 8, fontSize: 12 }} value={videoForm.url} onChange={e => setVideoForm({ ...videoForm, url: e.target.value })} placeholder="Or paste Cloudinary URL directly..." required />
                                            )}
                                        </div>

                                        <div>
                                            <label className="field-label">Flag / Thumbnail Image</label>
                                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                                <label style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                                    padding: '10px 18px', background: 'rgba(255,119,0,0.12)',
                                                    border: '1px dashed rgba(255,119,0,0.4)', borderRadius: 10,
                                                    color: '#FF9A00', fontWeight: 600, cursor: 'pointer', fontSize: 13,
                                                    transition: 'all 0.2s'
                                                }}>
                                                    <i className={`fa ${uploading ? 'fa-spinner fa-spin' : (videoForm.thumbnail ? 'fa-refresh' : 'fa-image')}`}></i>
                                                    {uploading ? 'Uploading...' : (videoForm.thumbnail ? 'Change Thumbnail' : 'Upload Thumbnail')}
                                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'videoThumbnail')} style={{ display: 'none' }} />
                                                </label>
                                                {videoForm.thumbnail && (
                                                    <img src={videoForm.thumbnail} alt="Preview" style={{ width: 60, height: 40, borderRadius: 8, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
                                                )}
                                            </div>
                                            {videoForm.thumbnail && (
                                                <input className="field-input" style={{ marginTop: 8, fontSize: 12 }} value={videoForm.thumbnail} onChange={e => setVideoForm({ ...videoForm, thumbnail: e.target.value })} placeholder="Or paste image URL directly..." required />
                                            )}
                                        </div>
                                    </div>
                                    
                                    <button type="submit" className="btn-primary full" disabled={loading || !videoForm.url || !videoForm.thumbnail}>
                                        {loading ? <i className="fa fa-spinner fa-spin"></i> : <i className="fa fa-save"></i>}
                                        {editingVideo ? ' Update Video' : ' Save Video'}
                                    </button>
                                </form>
                            ) : (
                                <div className="event-list">
                                    {videos.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.2)' }}>
                                            <i className="fa fa-play-circle fa-3x mb-3"></i>
                                            <p>No videos uploaded yet.</p>
                                        </div>
                                    ) : videos.map(vid => (
                                        <div key={vid.id} className="blog-card">
                                            <img src={vid.thumbnail} className="blog-img" alt={vid.country} />
                                            <div className="blog-info">
                                                <h3 className="blog-title-text"><i className="fa fa-play-circle" style={{ marginRight: 10, color: '#FF7700' }}></i> {vid.title}</h3>
                                                <div className="blog-meta">
                                                    <span><i className="fa fa-globe"></i> {vid.country}</span>
                                                </div>
                                                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: '10px 0' }}>
                                                    <a href={vid.url} target="_blank" rel="noreferrer" style={{ color: '#63B3ED', textDecoration: 'none' }}>Preview Video</a>
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                                <button className="btn-outline" onClick={() => {
                                                    setEditingVideo(vid);
                                                    setVideoForm({
                                                        title: vid.title,
                                                        url: vid.url,
                                                        thumbnail: vid.thumbnail,
                                                        country: vid.country || ''
                                                    });
                                                    setShowVideoForm(true);
                                                }}>
                                                    <i className="fa fa-edit"></i>
                                                </button>
                                                <button className="btn-danger" onClick={() => deleteVideo(vid.id)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}
